import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HistoryData, HistoryDataDocument } from './schemas/history-data.schema';

@Injectable()
export default class HistoryDataRepository extends BaseRepository<HistoryDataDocument> {
  constructor(@InjectModel(HistoryData.name) model: PaginateModel<HistoryDataDocument>) {
    super(model);
  }
}
