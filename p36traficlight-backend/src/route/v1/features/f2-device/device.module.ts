import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './schemas/device.schema';
import DeviceController from './device.controller';
import DeviceRepository from './device.repository';
import DeviceService from './device.service';
import DeviceTcpService from './device.tcp.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Device.name,
        schema: DeviceSchema,
      },
    ]),
  ],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository, DeviceTcpService],
  exports: [DeviceService, DeviceRepository, DeviceTcpService],
})
export default class DeviceModule {}
