import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInAdminComponent } from './sign-in-admin/sign-in-admin.component';
import { SignInComponent } from './sign-in.component';
import { SignInUserComponent } from './sign-in-user/sign-in-user.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ForgotPasswordAdminComponent } from '../forgot-password-Admin/forgot-password.component';

import { VerifyEmailComponent } from '../verify-email/verify-email.component';
import { VerifyEmailAdminComponent } from '../verify-emailAdmin/verify-email.component';

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
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'forgot-password-admin',
        component: ForgotPasswordAdminComponent,
      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent,
      },
      {
        path: 'verify-email-admin',
        component: VerifyEmailAdminComponent,
      },
      {
        path: '',
        component: SignInUserComponent,
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInRoutingModule {}
