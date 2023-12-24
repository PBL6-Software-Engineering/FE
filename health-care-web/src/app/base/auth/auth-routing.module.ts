import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CanAuth } from 'src/app/core/guards/can-auth-guard';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyEmailAdminComponent } from './verify-emailAdmin/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordAdminComponent } from './forgot-password-Admin/forgot-password.component';
import { ResetPasswordUserComponent } from './reset-password-user/reset-password-user.component';
import { ResetPasswordAdminComponent } from './reset-password-admin/reset-password-admin.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { VerifyEmailComponent } from './verify-email/verify-email.component';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    // canActivate: [CanAuth],
    children: [
      {
        path: 'sign-in',
        loadChildren: () =>
          import('./sign-in/sign-in.module').then((m) => m.SignInModule),
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./sign-up/sign-up.module').then((m) => m.SignUpModule),
      },
      {
        path: 'verify-email/admin',
        component: VerifyEmailAdminComponent,
      },
      {
        path: 'verify-email/user',
        component: VerifyEmailComponent,
      },
      {
        path: 'forgot-password/user',
        component: ForgotPasswordComponent,
      },
      {
        path: 'forgot-password/admin',
        component: ForgotPasswordAdminComponent,
      },
      {
        path: 'reset-password/user',
        component: ResetPasswordUserComponent,
      },
      {
        path: 'reset-password/admin',
        component: ResetPasswordAdminComponent,
      },
      {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
