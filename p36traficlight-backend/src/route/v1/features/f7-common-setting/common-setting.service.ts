import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { CommonSettingDocument } from './schemas/common-setting.schema';
import CommonSettingRepository from './common-setting.repository';

@Injectable()
export default class CommonSettingService extends BaseService<CommonSettingDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly commonSettingRepository: CommonSettingRepository,
  ) {
    super(logger, commonSettingRepository);
  }
}
