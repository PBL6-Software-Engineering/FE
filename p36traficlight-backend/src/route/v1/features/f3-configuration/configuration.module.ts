import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import DeviceModule from '@features/f2-device/device.module';
import { Configuration, ConfigurationSchema } from './schemas/configuration.schema';
import ConfigurationController from './configuration.controller';
import ConfigurationRepository from './configuration.repository';
import ConfigurationService from './configuration.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Configuration.name,
        schema: ConfigurationSchema,
      },
    ]),
    DeviceModule,
  ],
  controllers: [ConfigurationController],
  providers: [ConfigurationService, ConfigurationRepository],
  exports: [ConfigurationService, ConfigurationRepository],
})
export default class ConfigurationModule {}
