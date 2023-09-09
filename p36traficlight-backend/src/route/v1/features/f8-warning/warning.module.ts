import DeviceErrorModule from '@features/f6-device-error/device-error.module';
import CommonSettingModule from '@features/f7-common-setting/common-setting.module';
import DeviceModule from '@features/f2-device/device.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Warning, WarningSchema } from './schemas/warning.schema';
import WarningController from './warning.controller';
import WarningRepository from './warning.repository';
import WarningService from './warning.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Warning.name,
        schema: WarningSchema,
      },
    ]),
    DeviceModule,
    CommonSettingModule,
    DeviceErrorModule,
  ],
  controllers: [WarningController],
  providers: [WarningService, WarningRepository],
  exports: [WarningService, WarningRepository],
})
export default class WarningModule {}
