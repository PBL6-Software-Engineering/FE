import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F2AccountSettingRoutingModule } from './f2-account-setting-routing.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProfileHospitalComponent } from './update-profile-hospital/update-profile-hospital.component';
import { UpdateProfileDoctorComponent } from './update-profile-doctor/update-profile-doctor.component';
import { UpdateProfileAdminComponent } from './update-profile-admin/update-profile-admin.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    UpdatePasswordComponent,
    UpdateProfileHospitalComponent,
    UpdateProfileDoctorComponent,
    UpdateProfileAdminComponent,
  ],
  imports: [
    CommonModule,
    F2AccountSettingRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class F2AccountSettingModule {}
