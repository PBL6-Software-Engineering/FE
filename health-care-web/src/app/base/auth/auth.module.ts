import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInModule } from './sign-in/sign-in.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { BackgroundComponent } from './layout/background/background.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyEmailAdminComponent } from './verify-emailAdmin/verify-email.component';
import { ForgotPasswordAdminComponent } from './forgot-password-Admin/forgot-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordUserComponent } from './reset-password-user/reset-password-user.component';
import { ResetPasswordAdminComponent } from './reset-password-admin/reset-password-admin.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    AuthComponent,
    BackgroundComponent,
    VerifyEmailComponent,
    VerifyEmailAdminComponent,
    ForgotPasswordComponent,
    ForgotPasswordAdminComponent,
    ResetPasswordUserComponent,
    ResetPasswordAdminComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SignInModule,
    SignUpModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
  ],
})
export class AuthModule {}
