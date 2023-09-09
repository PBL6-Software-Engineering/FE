import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Firmware, FirmwareDocument } from './schemas/firmware.schema';

@Injectable()
export default class FirmwareRepository extends BaseRepository<FirmwareDocument> {
  constructor(@InjectModel(Firmware.name) model: PaginateModel<FirmwareDocument>) {
    super(model);
  }
}
