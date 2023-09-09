import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { TypeDeviceDocument } from './schemas/type-device.schema';
import TypeDeviceRepository from './type-device.repository';

@Injectable()
export default class TypeDeviceService extends BaseService<TypeDeviceDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly typeDeviceRepository: TypeDeviceRepository,
  ) {
    super(logger, typeDeviceRepository);
  }
}
