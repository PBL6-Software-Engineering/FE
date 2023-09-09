import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TypeDevice, TypeDeviceDocument } from './schemas/type-device.schema';

@Injectable()
export default class TypeDeviceRepository extends BaseRepository<TypeDeviceDocument> {
  constructor(@InjectModel(TypeDevice.name) model: PaginateModel<TypeDeviceDocument>) {
    super(model);
  }
}
