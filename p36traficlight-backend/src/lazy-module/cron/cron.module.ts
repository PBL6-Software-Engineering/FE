// import BackupDataModule from '@lazy-module/backup-data/backup-data.module';
import BackupDataModule from '@common/c0-backup/backup-data.module';
import FirebaseModule from '@common/c15-firebase/firebase.module';
import DeviceModule from '@features/f2-device/device.module';
import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import CronService from './cron.service';

@Global()
@Module({
  imports: [ScheduleModule.forRoot(), BackupDataModule, DeviceModule],
  providers: [CronService],
  exports: [CronService],
})
export default class CronModule {}
