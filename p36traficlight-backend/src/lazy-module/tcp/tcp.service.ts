import { DeviceFirebaseRefService } from '@common/c15-firebase/device/device.firebaseRef';
import HistoryLostConnectService from '@features/f10-history-lost-connect/history-lost-connect.service';
import DeviceService from '@features/f2-device/device.service';
import {
  BadRequestException, forwardRef, Inject, Injectable
} from '@nestjs/common';
import { commonHelper } from '../../util/helper/common.helper';

const net = require('net');

@Injectable()
export default class CustomTCPService {
  // Socket map
  sockets = new Map([]);

  /**
   * constructor
   */
  constructor(private readonly deviceFirebaseRefService: DeviceFirebaseRefService,
              @Inject(forwardRef(() => DeviceService))
              private readonly deviceService: DeviceService,
              private readonly historyLostConnectService: HistoryLostConnectService,) {
  }

  /**
   * connect
   * @param port
   * @param host
   */
  public connect(port: number, host: string) {
    if (this.sockets.has(port + host)) {
      return;
    }
    const client = new net.Socket();
    /**
     * Connect
     */
    client.connect(port, host, () => {
      // this.processReconnect(port, host);
      this.sockets.set(port + host, client);
    });
    /**
     * On data
     */
    client.on('data', (data: any) => {
      this.handleData(data);
    });
    /**
     * Catch connect error
     */
    client.on('error', (error: any) => {
      this.sockets.delete(port + host);
      client.destroy();
    });
    /**
     * On close
     */
    client.on('close', () => {
      // this.processLostConnect(port, host);
      // Destroy client socket
      client.destroy();
      // Remove left map
      this.sockets.delete(port + host);
    });
  }

  handleData(data: any) {
    const decimals = commonHelper.convertHexToDec(data.toString());
    if (!commonHelper.isValidChecksum(decimals)) {
      return;
    }
    // cmd 0x02
    if (decimals[1] === 2) {
      // decimals[0]: id device
      this.deviceFirebaseRefService.create(String(decimals[0]), {
        data: decimals.slice(3, decimals.length - 1)
      });
    }
  }

  /**
   * emit data
   * @param port
   * @param host
   * @param data
   */
  public emitData(port: number, host: string, data: String) {
    const client = this.sockets.get(port + host) as any;
    client.write(data);
  }

  /**
   * processLostConnect
   * @param host
   * @param port
   */
  private async processLostConnect(port: number, host: string) {
    // find device by host, port
    const device = await this.deviceService.findOneBy({ ip: host, port });
    // find last history last connect of device
    const lastLost = await this.historyLostConnectService.findOneBy(
      { idDevice: device._id, timeReconnect: 0 },
      { sort: { created_at: -1 } }
    );
    // if not exist record lastLost => create new history lost connect
    if (!lastLost) {
      const historyConnect = {
        idDevice: device._id.toString(),
        timeLostConnect: new Date().getTime(),
      };
      device.numberLostConnect += 1;
      await this.historyLostConnectService.create(historyConnect);
      await this.deviceService.updateOneById(device._id, device);
    }
  }

  /**
   * processReconnect
   * @param port
   * @param host
   */
  private async processReconnect(port: number, host: string) {
    // find device by host, port
    const device = await this.deviceService.findOneBy({ ip: host, port });
    // find last history last connect of device
    const lastLost = await this.historyLostConnectService.findOneBy(
      { idDevice: device._id, timeReconnect: 0 },
      { sort: { created_at: -1 } }
    );
    // if exist record lastLost => update time reconnect
    if (lastLost) {
      lastLost.timeReconnect = new Date().getTime();
      await this.historyLostConnectService.updateOneById(lastLost._id, lastLost);
    }
  }

  public getConnect(port: number, host: string) {
    const client = this.sockets.has(port + host) ? this.sockets.get(port + host) : undefined;
    return client;
  }

  /**
   * addListenerHandleData
   * @param port
   * @param host
   */
  public addListenerHandleData(port: number, host: string) {
    const client = this.sockets.get(port + host) as any;
    client.on('data', (data: any) => {
      this.handleData(data);
    });
  }
}
