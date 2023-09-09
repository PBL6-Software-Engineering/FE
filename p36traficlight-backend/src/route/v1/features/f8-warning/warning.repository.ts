import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Warning, WarningDocument } from './schemas/warning.schema';

@Injectable()
export default class WarningRepository extends BaseRepository<WarningDocument> {
  constructor(@InjectModel(Warning.name) model: PaginateModel<WarningDocument>) {
    super(model);
  }
}
