import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { FirmwareDocument } from './schemas/firmware.schema';
import FirmwareRepository from './firmware.repository';

@Injectable()
export default class FirmwareService extends BaseService<FirmwareDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly firmwareRepository: FirmwareRepository,
  ) {
    super(logger, firmwareRepository);
  }
}
