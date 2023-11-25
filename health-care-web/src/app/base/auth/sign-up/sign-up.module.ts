import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { SignUpHospitalComponent } from './sign-up-hospital/sign-up-hospital.component';
import { SignUpComponent } from './sign-up.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignUpUserComponent, SignUpHospitalComponent, SignUpComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SignUpModule {}
