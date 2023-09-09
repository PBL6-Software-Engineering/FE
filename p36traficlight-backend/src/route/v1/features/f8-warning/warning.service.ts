import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { WarningDocument } from './schemas/warning.schema';
import WarningRepository from './warning.repository';

@Injectable()
export default class WarningService extends BaseService<WarningDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly warningRepository: WarningRepository,
  ) {
    super(logger, warningRepository);
  }
}
