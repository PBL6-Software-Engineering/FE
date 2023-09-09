import { DynamicModule, Global, Module } from '@nestjs/common';
import { DeviceFirebaseService } from './device/device.firebase';
import DeviceFirebaseController from './device/device.firebase.controller';
import { DeviceFirebaseRefService } from './device/device.firebaseRef';

@Module({
  controllers: [DeviceFirebaseController],
  providers: [DeviceFirebaseService, DeviceFirebaseRefService],
  exports: [DeviceFirebaseService, DeviceFirebaseRefService],
})
export default class FirebaseModule {
}
