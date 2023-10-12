import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInAdminComponent } from './sign-in-admin/sign-in-admin.component';
import { SignInComponent } from './sign-in.component';
import { SignInHospitalComponent } from './sign-in-hospital/sign-in-hospital.component';
import { SignInDoctorComponent } from './sign-in-doctor/sign-in-doctor.component';
import { SignInUserComponent } from './sign-in-user/sign-in-user.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '', // auth/sign-in
    component: SignInComponent,
    children: [
      {
        path: 'admin',
        component: SignInAdminComponent,
      },
      {
        path: 'hospital',
        component: SignInHospitalComponent,
      },
      {
        path: 'doctor',
        component: SignInDoctorComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent,
      },
      {
        path: '',
        component: SignInUserComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
