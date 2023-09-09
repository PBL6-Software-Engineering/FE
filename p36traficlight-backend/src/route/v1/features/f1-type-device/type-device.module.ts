import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TypeDevice, TypeDeviceSchema } from './schemas/type-device.schema';
import TypeDeviceController from './type-device.controller';
import TypeDeviceRepository from './type-device.repository';
import TypeDeviceService from './type-device.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TypeDevice.name,
        schema: TypeDeviceSchema,
      },
    ]),
  ],
  controllers: [TypeDeviceController],
  providers: [TypeDeviceService, TypeDeviceRepository],
  exports: [TypeDeviceService, TypeDeviceRepository],
})
export default class TypeDeviceModule {}
