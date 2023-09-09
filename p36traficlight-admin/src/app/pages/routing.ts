import { Routes } from '@angular/router';

// @ts-ignore
const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/base/sample/account/account.module').then(
        (m) => m.AccountModule
      ),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/common/wizards/wizards.module').then(
        (m) => m.WizardsModule
      ),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/common/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/common/capps/chat/chat.module').then(
        (m) => m.ChatModule
      ),
  },

  // Profile
  {
    path: 'profile',
    loadChildren: () =>
      import('../modules/base/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },

  // Account
  {
    path: 'features/users',
    loadChildren: () =>
      import('../modules/base/b2-users/b2-users.module').then(
        (m) => m.B2UsersModule
      ),
  },

  {
    path: 'features/groups',
    loadChildren: () =>
      import('../modules/base/b8-group/b8-group.module').then(
        (m) => m.B8GroupModule
      ),
  },
  {
    path: 'features/group-details',
    loadChildren: () =>
      import('../modules/base/b8-group/b8-group.module').then(
        (m) => m.B8GroupModule
      ),
  },


  // Common
  {
    path: 'features/dashboards',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'features/backupdatas',
    loadChildren: () =>
      import('../modules/common/c1-backup/c1-backup.module').then(
        (m) => m.C1BackupModule
      ),
  },
  {
    path: 'features/histories',
    loadChildren: () =>
      import('../modules/common/c2-histories/c2-history.module').then(
        (m) => m.C2HistoryModule
      ),
  },
  {
    path: 'features/filemanager',
    loadChildren: () =>
      import('../modules/common/c3-filemanager/c3-file-manager.module').then(
        (m) => m.C4FileManagerModule
      ),
  },
  {
    path: 'features/otps',
    loadChildren: () =>
      import('../modules/common/c4-otps/c4-otps.module').then(
        (m) => m.C4OtpModule
      ),
  },

  {
    path: 'features/provinces',
    loadChildren: () =>
      import('../modules/common/c5-provinces/c5-province.module').then(
        (m) => m.C5ProvinceModule
      ),
  },

  {
    path: 'features/districts',
    loadChildren: () =>
      import('../modules/common/c6-districts/c6-district.module').then(
        (m) => m.C6DistrictModule
      ),
  },

  {
    path: 'features/villages',
    loadChildren: () =>
      import('../modules/common/c7-wards/c7-ward.module').then(
        (m) => m.C7WardModule
      ),
  },
  {
    path: 'common/settings',
    loadChildren: () =>
      import('../modules/common/c13-settings/c13-settings.module').then(
        (m) => m.C13SettingsModule
      ),
  },

  {
    path: 'features/cron-jobs',
    loadChildren: () =>
      import('../modules/common/c8-cron-jobs/c8-cron-job.module').then(
        (m) => m.C8CronJobModule
      ),
  },

  // Authorization
  {
    path: 'features/freeapis',
    loadChildren: () =>
      import('../modules/base/b3-free-api/b3-free-api.module').then(
        (m) => m.B3FreeAPIModule
      ),
  },
  {
    path: 'features/authuseraccesses',
    loadChildren: () =>
      import(
        '../modules/base/b4-auth-user-access/b4-auth-user-access.module'
      ).then((m) => m.B4AuthUserAccessModule),
  },
  {
    path: 'features/authuserids',
    loadChildren: () =>
      import('../modules/base/b5-auth-user-id/b5-auth-user-id.module').then(
        (m) => m.B5AuthUserIdModule
      ),
  },
  {
    path: 'features/groupapis',
    loadChildren: () =>
      import('../modules/base/b6-group-api/b6-group-api.module').then(
        (m) => m.B6GroupAPIModule
      ),
  },
  // features
  {
    path:'features/type-devices',
    loadChildren:()=>
      import('../modules/features/f1-type-device/f1-type-device.module').then(
        (m)=> m.F1TypeDeviceModule
      )
  },
  {
    path:'features/devices',
    loadChildren:()=>
      import('../modules/features/f2-device/f2-device.module').then(
        (m)=> m.F2DeviceModule
      )
  },
  {
    path:'features/configurations',
    loadChildren:()=>
      import('../modules/features/f3-configuration/f3-configuration.module').then(
        (m)=> m.F3ConfigurationModule
      )
  },
  {
    path: 'features/logs',
    loadChildren: () =>
      import('../modules/features/f4-log/f4-log.module').then(
        (m) => m.F4LogModule)
  },
  {
    path:'features/firmwares',
    loadChildren:()=>
      import('../modules/features/f5-firmware/f5-firmware.module').then(
        (m)=> m.F5FirmwareModule
      )
  },
  {
    path:'features/device-errors',
    loadChildren:()=>
      import('../modules/features/f6-device-error/f6-device-error.module').then(
        (m)=> m.F6DeviceErrorModule)
  },
  {
    path:'features/common-settings',
    loadChildren:()=>
      import('../modules/features/f7-common-setting/f7-common-setting.module').then(
        (m)=> m.F7CommonSettingModule
      )
  },
  {
    path: 'features/warnings',
    loadChildren: () =>
      import('../modules/features/f8-warning/f8-warning.module').then(
        (m) => m.F8WarningModule
      ),
  },
  {
    path: 'features/accounts',
    loadChildren: () =>
      import('../modules/features/f9-accounts/f9-accounts.module').then(
        (m) => m.F9AccountsModule
      ),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
