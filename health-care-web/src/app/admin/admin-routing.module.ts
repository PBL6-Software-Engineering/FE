import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { F1DashboardComponent } from './f1-dashboard/f1-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: F1DashboardComponent,
      },
      {
        path: 'account-setting',
        loadChildren: () =>
          import('./f2-account-setting/f2-account-setting.module').then(
            (m) => m.F2AccountSettingModule
          ),
      },
      {
        path: 'general-hospital',
        loadChildren: () =>
          import('./f3-general-hospital/f3-general-hospital.module').then(
            (m) => m.F3GeneralHospitalModule
          ),
      },
      {
        path: 'general',
        loadChildren: () =>
          import('./f3-general/f3-general.module').then(
            (m) => m.F3GeneralModule
          ),
      },
      {
        path: 'account-user',
        loadChildren: () =>
          import('./f4-account-user/f4-account-user.module').then(
            (m) => m.F4AccountUserModule
          ),
      },
      {
        path: 'hospital',
        loadChildren: () =>
          import('./f5-hospital/f5-hospital.module').then(
            (m) => m.F5HospitalModule
          ),
      },
      {
        path: 'doctor',
        loadChildren: () =>
          import('./f6-doctor/f6-doctor.module').then((m) => m.F6DoctorModule),
      },
      {
        path: 'working-time',
        loadChildren: () =>
          import('./f9-working-time/f9-working-time.module').then(
            (m) => m.F9WorkingTimeModule
          ),
      },
      {
        path: 'appointment',
        loadChildren: () =>
          import('./f10-appointment/f10-appointment.module').then(
            (m) => m.F10AppointmentModule
          ),
      },
      {
        path: 'article',
        loadChildren: () =>
          import('./f11-article/f11-article.module').then(
            (m) => m.F11ArticleModule
          ),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./f12-chat/f12-chat.module').then((m) => m.F12ChatModule),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./f14-report/f14-report.module').then(
            (m) => m.F14ReportModule
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
