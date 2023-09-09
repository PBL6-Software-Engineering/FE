import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { ConfigurationDocument } from './schemas/configuration.schema';
import ConfigurationRepository from './configuration.repository';

@Injectable()
export default class ConfigurationService extends BaseService<ConfigurationDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly configurationRepository: ConfigurationRepository,
  ) {
    super(logger, configurationRepository);
  }

  async insertMany(data: any[]): Promise<any | null> {
    return this.configurationRepository.insertMany(data);
  }
}
