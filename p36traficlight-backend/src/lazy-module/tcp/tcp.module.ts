import FirebaseModule from '@common/c15-firebase/firebase.module';
import HistoryLostConnectModule from '@features/f10-history-lost-connect/history-lost-connect.module';
import DeviceModule from '@features/f2-device/device.module';
import { ConsoleLogger, Global, Module } from '@nestjs/common';

import CustomTCPService from './tcp.service';

@Global()
@Module({
  imports: [
    FirebaseModule,
    DeviceModule,
    HistoryLostConnectModule,
  ],
  providers: [
    CustomTCPService,
    ConsoleLogger,
  ],
  exports: [CustomTCPService],
})
export default class CustomTCPModule {}
