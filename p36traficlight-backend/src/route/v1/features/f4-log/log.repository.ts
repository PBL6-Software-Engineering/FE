import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Log, LogDocument } from './schemas/log.schema';

@Injectable()
export default class LogRepository extends BaseRepository<LogDocument> {
  constructor(@InjectModel(Log.name) model: PaginateModel<LogDocument>) {
    super(model);
  }
}
