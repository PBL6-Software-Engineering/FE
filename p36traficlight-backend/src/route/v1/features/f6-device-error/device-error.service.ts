import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { DeviceErrorDocument } from './schemas/device-error.schema';
import DeviceErrorRepository from './device-error.repository';

@Injectable()
export default class DeviceErrorService extends BaseService<DeviceErrorDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly deviceErrorRepository: DeviceErrorRepository,
  ) {
    super(logger, deviceErrorRepository);
  }
}
