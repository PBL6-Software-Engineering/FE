import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { F1DashboardComponent } from './f1-dashboard/f1-dashboard.component';
import { F4ManageAdminComponent } from './f4-manage-admin/f4-manage-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./f1-dashboard/f1-dashboard.module').then(
            (m) => m.F1DashboardModule,
          ),
      },
      {
        path: 'account-setting',
        loadChildren: () =>
          import('./f2-account-setting/f2-account-setting.module').then(
            (m) => m.F2AccountSettingModule,
          ),
      },
      {
        path: 'general-hospital',
        loadChildren: () =>
          import('./f3-general-hospital/f3-general-hospital.module').then(
            (m) => m.F3GeneralHospitalModule,
          ),
      },
      {
        path: 'general',
        loadChildren: () =>
          import('./f3-general/f3-general.module').then(
            (m) => m.F3GeneralModule,
          ),
      },
      {
        path: 'account-user',
        loadChildren: () =>
          import('./f4-account-user/f4-account-user.module').then(
            (m) => m.F4AccountUserModule,
          ),
      },
      {
        path: 'manage-admin',
        loadChildren: () =>
          import('./f4-manage-admin/f4-manage-admin.module').then(
            (m) => m.F4ManageAdminModule,
          ),
      },
      {
        path: 'hospital',
        loadChildren: () =>
          import('./f5-hospital/f5-hospital.module').then(
            (m) => m.F5HospitalModule,
          ),
      },
      {
        path: 'health-insurance',
        loadChildren: () =>
          import('./f12-health-insurance/f12-health-insurance.module').then(
            (m) => m.F12HealthInsuranceModule,
          ),
      },
      {
        path: 'health-insurance-hospital',
        loadChildren: () =>
          import(
            './f13-health-insurance-hospital/f13-health-insurance-hospital.module'
          ).then((m) => m.F13HealthInsuranceHospitalModule),
      },
      {
        path: 'doctor',
        loadChildren: () =>
          import('./f6-doctor/f6-doctor.module').then((m) => m.F6DoctorModule),
      },
      {
        path: 'working-time',
        loadChildren: () =>
          import('./f7-working-time/f7-working-time.module').then(
            (m) => m.F7WorkingTimeModule,
          ),
      },
      {
        path: 'appointment',
        loadChildren: () =>
          import('./f8-appointment/f8-appointment.module').then(
            (m) => m.F8AppointmentModule,
          ),
      },
      {
        path: 'article',
        loadChildren: () =>
          import('./f9-article/f9-article.module').then(
            (m) => m.F9ArticleModule,
          ),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./f10-chat/f10-chat.module').then((m) => m.F10ChatModule),
      },
      {
        path: 'statistic',
        loadChildren: () =>
          import('./f11-statistic/f11-statistic.module').then(
            (m) => m.F11StatisticModule,
          ),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
