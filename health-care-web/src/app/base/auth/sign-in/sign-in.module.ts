import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInAdminComponent } from './sign-in-admin/sign-in-admin.component';
import { SignInUserComponent } from './sign-in-user/sign-in-user.component';
import { SignInHospitalComponent } from './sign-in-hospital/sign-in-hospital.component';
import { SignInDoctorComponent } from './sign-in-doctor/sign-in-doctor.component';
import { SignInComponent } from './sign-in.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    SignInAdminComponent,
    SignInUserComponent,
    SignInHospitalComponent,
    SignInDoctorComponent,
    SignInComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    FormsModule
  ]
})
export class SignInModule { }
