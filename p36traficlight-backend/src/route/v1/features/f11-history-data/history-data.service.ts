import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import HistoryDataRepository from './history-data.repository';
import { HistoryDataDocument } from './schemas/history-data.schema';

@Injectable()
export default class HistoryDataService extends BaseService<HistoryDataDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly historyDataRepository: HistoryDataRepository,
  ) {
    super(logger, historyDataRepository);
  }
}
