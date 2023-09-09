import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DeviceError, DeviceErrorSchema } from './schemas/device-error.schema';
import DeviceErrorController from './device-error.controller';
import DeviceErrorRepository from './device-error.repository';
import DeviceErrorService from './device-error.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DeviceError.name,
        schema: DeviceErrorSchema,
      },
    ]),
  ],
  controllers: [DeviceErrorController],
  providers: [DeviceErrorService, DeviceErrorRepository],
  exports: [DeviceErrorService, DeviceErrorRepository],
})
export default class DeviceErrorModule {}
