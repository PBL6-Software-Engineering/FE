import { RouterModule, Routes } from 'nest-router';
import FreeApiModule from '@authorization/a2-free-api/free-api.module';
import AuthUserAccessModule from '@authorization/a3-auth-user-access/auth-user-access.module';
import AuthUserIdModule from '@authorization/a4-auth-user-id/auth-user-id.module';
import GroupModule from '@authorization/a5-group/group.module';
import GroupDetailModule from '@authorization/a6-group-detail/group-detail.module';
import GroupApiModule from '@authorization/a7-group-api/group-api.module';
import BackupDataModule from '@common/c0-backup/backup-data.module';
import DashboardModule from '@common/c10-dashboard/dashboard.module';
import TransactionModule from '@common/c11-transaction/transaction.module';
import NotificationModule from '@common/c12-notification/notification.module';
import SettingModule from '@common/c13-setting/setting.module';
import OtpModule from '@common/c2-otp/otp.module';
import HistoryModule from '@common/c9-history/history.module';

import RolesGuard from '@guard/roles.guard';
import { ShareFunction } from '@helper/static-function';
import { Module } from '@nestjs/common';

import TypeDeviceModule from '@features/f1-type-device/type-device.module';
import DeviceModule from '@features/f2-device/device.module';
import DeviceErrorModule from '@features/f6-device-error/device-error.module';
import CommonSettingModule from '@features/f7-common-setting/common-setting.module';
import ConfigurationModule from '@features/f3-configuration/configuration.module';
import LogModule from '@features/f4-log/log.module';
import FirmwareModule from '@features/f5-firmware/firmware.module';
import WarningModule from '@features/f8-warning/warning.module';
import HistoryLostConnectModule from '@features/f10-history-lost-connect/history-lost-connect.module';
import HistoryDataModule from '@features/f11-history-data/history-data.module';
import WarningFirebaseModule from '@common/c16-warning-firebase/warning.firebase.module';
import UserModule from './authorization/a1-user/user.module';
import AuthModule from './common/c1-auth/auth.module';
import UploadModule from './common/c3-upload/upload.module';
import FileManagerModule from './common/c4-file-manager/file-manager.module';
import StaticS3Module from './common/c5-static-s3/static-s3.module';
import ProvinceModule from './common/c6-province/province.module';
import DistrictModule from './common/c7-district/district.module';
import VillageModule from './common/c8-village/village.module';
// import { SeedModule } from '@common/c14-seed/seed.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      // Authorizations
      { path: '/users', module: UserModule },
      { path: '/free-apis', module: FreeApiModule },
      { path: '/auth-user-accesses', module: AuthUserAccessModule },
      { path: '/auth-user-ids', module: AuthUserIdModule },
      { path: '/groups', module: GroupModule },
      { path: '/group-details', module: GroupDetailModule },
      { path: '/group-apis', module: GroupApiModule },

      // Seed
      // { path: '/seeds', module: SeedModule },

      // Commons
      { path: '/backup-datas', module: BackupDataModule },
      { path: '/auth', module: AuthModule },
      { path: '/otps', module: OtpModule },
      { path: '/uploads', module: UploadModule },
      { path: '/file-manager', module: FileManagerModule },
      { path: '/provinces', module: ProvinceModule },
      { path: '/districts', module: DistrictModule },
      { path: '/villages', module: VillageModule },
      { path: '/histories', module: HistoryModule },
      { path: '/dashboards', module: DashboardModule },
      { path: '/transactions', module: TransactionModule },
      { path: '/notifications', module: NotificationModule },
      { path: '/settings', module: SettingModule },

      // Features
      { path: '/type-devices', module: TypeDeviceModule },
      { path: '/devices', module: DeviceModule },
      { path: '/configurations', module: ConfigurationModule },
      { path: '/logs', module: LogModule },
      { path: '/device-errors', module: DeviceErrorModule },
      { path: '/firmwares', module: FirmwareModule },
      { path: '/common-settings', module: CommonSettingModule },
      { path: '/warnings', module: WarningModule },
      { path: '/history-lost-connects', module: HistoryLostConnectModule },
      { path: '/history-datas', module: HistoryDataModule },
      { path: '/warning-firebases', module: WarningFirebaseModule },
    ],
  },
];

if (ShareFunction.checkIsConfigS3Storage()) {
  /* eslint no-console: 0 */
  console.log('*** Replace serve static via router static with s3 storage ***');
  routes.push({ path: '/static', module: StaticS3Module });
}
const imports = [
  RouterModule.forRoutes(routes),

  // authorization
  UserModule,
  FreeApiModule,
  AuthUserAccessModule,
  AuthUserIdModule,
  GroupModule,
  GroupDetailModule,
  GroupApiModule,
  RolesGuard,

  // Seed
  // SeedModule,

  // common
  BackupDataModule,
  AuthModule,
  OtpModule,
  UploadModule,
  FileManagerModule,
  ProvinceModule,
  DistrictModule,
  VillageModule,
  HistoryModule,
  DashboardModule,

  // features
  TypeDeviceModule,
  DeviceModule,
  ConfigurationModule,
  LogModule,
  DeviceErrorModule,
  FirmwareModule,
  CommonSettingModule,
  HistoryDataModule,
  WarningModule,

  // firebase
  WarningFirebaseModule
];

if (ShareFunction.checkIsConfigS3Storage()) {
  /* eslint no-console: 0 */
  console.log('*** Import module S3Storage dynamic ***');
  imports.push(StaticS3Module);
}

@Module({
  imports,
})
export default class V1Module {}
