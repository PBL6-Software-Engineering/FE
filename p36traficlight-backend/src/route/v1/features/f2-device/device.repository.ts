import { Model, PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Device, DeviceDocument } from './schemas/device.schema';

@Injectable()
export default class DeviceRepository extends BaseRepository<DeviceDocument> {
  constructor(@InjectModel(Device.name) model: PaginateModel<DeviceDocument>,
  @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>) {
    super(model);
  }

  public async findByGroup(query = {}): Promise<any> {
    return this.deviceModel.find(query)
      .where({ isGroup: true, isLock: false })
      .populate({
        path: 'childs',
        populate: [
          {
            path: 'idTypeDevice',
          }
        ],
        options: { sort: { position: 1 } }
      })
      .populate('idTypeDevice')
      .populate('idProvince')
      .lean();
  }

  public async findGroupById(id: any): Promise<any> {
    return this.deviceModel.findOne({ _id: id })
      .populate({
        path: 'childs',
        populate: [
          {
            path: 'idTypeDevice',
            model: 'TypeDevice',
          }
        ],
        options: { sort: { position: 1 } }
      })
      .populate('idTypeDevice')
      .populate('idProvince')
      .lean();
  }
}
