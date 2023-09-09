import BackupDataService from '@common/c0-backup/backup-data.service';
import { DeviceFirebaseService } from '@common/c15-firebase/device/device.firebase';
import { DeviceFirebaseRefService } from '@common/c15-firebase/device/device.firebaseRef';
import DeviceService from '@features/f2-device/device.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import StorageService from '@lazy-module/storage/storage.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export default class CronService {
  constructor(
    private logger: CustomLoggerService,
    private storageService: StorageService,
    private backupDataService: BackupDataService,
    private deviceService: DeviceService,
  ) {}

  // Remove old files
  @Cron(CronExpression.EVERY_HOUR)
  async handleRemoveOldFile() {
    await this.storageService.removeOldFile();
    this.logger.log(`Call remove old files at ${new Date().toLocaleString()}`);
  }

  // Backup data
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleBackupData() {
    await this.backupDataService.backup();
  }

  // Start all device
  @Cron(CronExpression.EVERY_MINUTE)
  async startAllDevices() {
    await this.deviceService.startAllDevices();
  }
}
