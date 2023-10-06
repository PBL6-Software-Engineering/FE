import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthComponent } from './auth.component';
import { SignInModule } from './sign-in/sign-in.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { BackgroundComponent } from './layout/background/background.component';


@NgModule({
  declarations: [
    ForgotPasswordComponent,
    AuthComponent,
    BackgroundComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SignInModule,
    SignUpModule,
  ]
})
export class AuthModule { }
