import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { LogDocument } from './schemas/log.schema';
import LogRepository from './log.repository';

@Injectable()
export default class LogService extends BaseService<LogDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly logRepository: LogRepository,
  ) {
    super(logger, logRepository);
  }
}
