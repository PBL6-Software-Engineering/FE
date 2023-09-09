import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HistoryLostConnect, HistoryLostConnectDocument } from './schemas/history-lost-connect.schema';

@Injectable()
export default class HistoryLostConnectRepository extends BaseRepository<HistoryLostConnectDocument> {
  constructor(@InjectModel(HistoryLostConnect.name) model: PaginateModel<HistoryLostConnectDocument>) {
    super(model);
  }
}
