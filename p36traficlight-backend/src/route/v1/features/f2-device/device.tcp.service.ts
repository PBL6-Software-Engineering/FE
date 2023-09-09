import GlobalInstanceService from '@lazy-module/global-instance/global-instance.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { commonHelper } from '@helper/common.helper';

@Injectable()
export default class DeviceTcpService {
  constructor(
    @Inject(forwardRef(() => GlobalInstanceService))
    readonly globalInstanceService: GlobalInstanceService,
  ) {
  }

  /**
   * sendAndReceiveData
   * @param port
   * @param host
   * @param data
   */
  public async sendAndReceiveData(port: number, host: string, data: String): Promise<any> {
    let timeoutId: any;
    return new Promise<any>((resolve, reject) => {
      try {
        let client = this.globalInstanceService.getConnect(port, host) as any;

        if (!client) {
          this.globalInstanceService.tcpConnect(port, host);
          client = this.globalInstanceService.getConnect(port, host) as any;

          if (!client) {
            reject(new Error('Thiết bị kết nối không thành công!'));
            return;
          }
        }
        client.write(`4D4543${data}`);

        // nếu cmd = 0x07
        if (+data[4] * 10 + +data[5] === 7) {
          // Đợi 10s
          timeoutId = setTimeout(() => {
            reject(new Error('Cập nhật điều khiển không thành công'));
          }, 10000);
        }

        // xử lý lúc nhận dữ liệu về
        client.on('data', (dataReceive: any) => {
          const decimals = commonHelper.convertHexToDec(dataReceive.toString());
          if (decimals[1] !== 2) {
            if (!commonHelper.isValidChecksum(decimals)) {
              reject(new Error('Dữ liệu nhận về không hợp lệ!'));
            }

            // nếu cmd = 0x07
            if (decimals[1] === 7) {
              clearTimeout(timeoutId);
              if (decimals[3] !== 1) {
                clearTimeout(timeoutId);
                reject(new Error('Cập nhật điều khiển không thành công!'));
                return;
              }
            }
            resolve({ result: dataReceive.toString() });

            // remove all listener data then add one listener data
            client.removeAllListeners('data');
            this.globalInstanceService.addListenerHandleData(port, host);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
