import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdateProfileHospitalComponent } from './update-profile-hospital/update-profile-hospital.component';
import { UpdateProfileDoctorComponent } from './update-profile-doctor/update-profile-doctor.component';
import { UpdateProfileAdminComponent } from './update-profile-admin/update-profile-admin.component';

const routes: Routes = [
  {
    path: 'update-password',
    component: UpdatePasswordComponent,
  },
  {
    path: 'update-info',
    children: [
      {
        path: 'hospital',
        component: UpdateProfileHospitalComponent,
      },
      {
        path: 'doctor',
        component: UpdateProfileDoctorComponent,
      },
      {
        path: 'admin',
        component: UpdateProfileAdminComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F2AccountSettingRoutingModule {}
