import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Firmware, FirmwareSchema } from './schemas/firmware.schema';
import FirmwareController from './firmware.controller';
import FirmwareRepository from './firmware.repository';
import FirmwareService from './firmware.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Firmware.name,
        schema: FirmwareSchema,
      },
    ]),
  ],
  controllers: [FirmwareController],
  providers: [FirmwareService, FirmwareRepository],
  exports: [FirmwareService, FirmwareRepository],
})
export default class FirmwareModule {}
