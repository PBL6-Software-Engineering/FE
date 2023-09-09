import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import HistoryLostConnectRepository from './history-lost-connect.repository';
import { HistoryLostConnectDocument } from './schemas/history-lost-connect.schema';

@Injectable()
export default class HistoryLostConnectService extends BaseService<HistoryLostConnectDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly historyLostConnectRepository: HistoryLostConnectRepository,
  ) {
    super(logger, historyLostConnectRepository);
  }
}
