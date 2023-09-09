import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import {
  BadRequestException, forwardRef, Inject, Injectable
} from '@nestjs/common';

import GlobalInstanceService from '@lazy-module/global-instance/global-instance.service';
import { ObjectId } from 'mongodb';
import { DeviceDocument } from './schemas/device.schema';
import DeviceRepository from './device.repository';

@Injectable()
export default class DeviceService extends BaseService<DeviceDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly deviceRepository: DeviceRepository,
    @Inject(forwardRef(() => GlobalInstanceService))
    readonly globalInstanceService: GlobalInstanceService,
  ) {
    super(logger, deviceRepository);
  }

  /**
   * findByGroup
   * @param query
   * @returns
   */
  public async findByGroup(query = {}): Promise<any | null> {
    return this.deviceRepository.findByGroup(query);
  }

  /**
   * findGroupById
   * @param id
   * @returns
   */
  public async findGroupById(id: any): Promise<any | null> {
    return this.deviceRepository.findGroupById(id);
  }

  /**
   * createGroup
   * @param data
   */
  public async createGroup(data: any): Promise<any | null> {
    // add group
    const oldGroup = await this.deviceRepository.findOneBy({ deviceCode: data.deviceCode });
    if (oldGroup) {
      throw new BadRequestException('deviceCode:Mã thiết bị đã tồn tại.');
    }
    const group = await this.deviceRepository.create(data);
    if (group.port >= 0) {
      this.globalInstanceService.tcpConnect(group.port, group.ip);
    }
    return group;
  }

  /**
   * createDevice
   * @param idGroup
   * @param data
   * @returns
   */
  public async createDevice(idGroup: any, data: any): Promise<any | null> {
    // find group by id
    const group = await this.findOneById(new ObjectId(idGroup));
    const groupPopulate = await this.deviceRepository.findGroupById(new ObjectId(idGroup));
    // throw exception if group not found
    if (!group) {
      throw new BadRequestException('Mã id không tồn tại');
    }
    // check position unique in group
    groupPopulate.childs.forEach((d: any) => {
      if (d.position === data.position) {
        throw new BadRequestException('position:Vị trí đã tồn tại trong nhóm.');
      }
    });
    // create device
    const device = await this.deviceRepository.create(data);
    // add device to group
    group.childs.push(device._id);
    await this.deviceRepository.updateOneById(group._id, group);
    return device;
  }

  /**
   * updateGroup
   * @param id
   * @param data
   * @returns
   */
  public async updateGroup(id: any, data: any): Promise<any | null> {
    const group = await this.deviceRepository.findOneById(id);
    // check id update
    if (!group) {
      throw new BadRequestException('Mã id không tồn tại.');
    }
    // check device code unique in database
    if (group.deviceCode !== data.deviceCode.toString()) {
      const isExistDeviceCode = await this.deviceRepository.findOneBy({ deviceCode: data.deviceCode });
      if (isExistDeviceCode) {
        throw new BadRequestException('deviceCode:Mã thiết bị đã tồn tại.');
      }
    }
    const result = await this.deviceRepository.updateOneById(id, data);
    // if change ip or port then connect tcp
    if (data.port >= 0 && (result.port !== group.port || result.ip !== group.ip)) {
      this.globalInstanceService.tcpConnect(result.port, result.ip);
    }
    return result;
  }

  /**
   * updateDevice
   * @param idGroup
   * @param id
   * @param body
   * @returns
   */
  public async updateDevice(idGroup: any, id: any, body: any): Promise<any | null> {
    const device = await this.deviceRepository.findOneById(id);
    // check id update
    if (!device) {
      throw new BadRequestException('Mã id không tồn tại.');
    }
    // find group for check position
    const group = await this.deviceRepository.findGroupById(new ObjectId(idGroup));
    // check position unique in group
    if (device.position !== body.position) {
      group.childs.forEach((d: any) => {
        if (d.position === body.position) {
          throw new BadRequestException('position:Vị trí đã tồn tại trong nhóm.');
        }
      });
    }
    // update device
    const result = await this.deviceRepository.updateOneById(id, body);
    return result;
  }

  /**
   * deleteDeviceInGroup
   * @param idGroup
   * @param idsDevice
   */
  public async updateChildGroup(idGroup: any, idsDevice: any[]): Promise<any | null> {
    const group = await this.findOneById(new ObjectId(idGroup));
    // update array childs in group
    const idsDeviceMap = new Map<any, boolean>();
    idsDevice.forEach((id: any) => idsDeviceMap.set(id, true));
    group.childs = group.childs.filter((id: any) => !idsDeviceMap.get(id.toString()));
    // update childs of group
    const result = await this.deviceRepository.updateOneById(group._id, group);
    return result;
  }

  /**
   * Start All devices
   */
  async startAllDevices() {
    const devices = await this.findManyBy(
      {
        isLock: false, isGroup: true, port: { $gt: -1 }, ip: { $ne: '' }
      },
      {
        projection: {
          deviceCode: 1,
          ip: 1,
          port: 1,
        },
      },
    );
    devices.forEach((device: any) => {
      if (device.port && device.ip) {
        return this.globalInstanceService.tcpConnect(device.port, device.ip);
      }
    });
  }
}
