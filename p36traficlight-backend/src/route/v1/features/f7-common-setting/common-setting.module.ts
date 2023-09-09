import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonSetting, CommonSettingSchema } from './schemas/common-setting.schema';
import CommonSettingController from './common-setting.controller';
import CommonSettingRepository from './common-setting.repository';
import CommonSettingService from './common-setting.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CommonSetting.name,
        schema: CommonSettingSchema,
      },
    ]),
  ],
  controllers: [CommonSettingController],
  providers: [CommonSettingService, CommonSettingRepository],
  exports: [CommonSettingService, CommonSettingRepository],
})
export default class CommonSettingModule {}
