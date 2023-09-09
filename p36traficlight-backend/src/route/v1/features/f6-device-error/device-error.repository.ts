import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { DeviceError, DeviceErrorDocument } from './schemas/device-error.schema';

@Injectable()
export default class DeviceErrorRepository extends BaseRepository<DeviceErrorDocument> {
  constructor(@InjectModel(DeviceError.name) model: PaginateModel<DeviceErrorDocument>) {
    super(model);
  }
}
