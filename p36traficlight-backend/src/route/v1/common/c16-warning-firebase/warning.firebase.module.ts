import { Module } from '@nestjs/common';
import { WarningFirebaseService } from './warning.firebase';
import WarningFirebaseController from './warning.firebase.controller';
import { WarningFirebaseRefService } from './warning.firebaseRef';

@Module({
  controllers: [WarningFirebaseController],
  providers: [WarningFirebaseService, WarningFirebaseRefService],
  exports: [WarningFirebaseService, WarningFirebaseRefService],
})
export default class WarningFirebaseModule {
}
