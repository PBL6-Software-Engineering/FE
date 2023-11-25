import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentHospitalComponent } from './appointment-hospital/appointment-hospital.component';
import { AppointmentDoctorComponent } from './appointment-doctor/appointment-doctor.component';

const routes: Routes = [
  {
    path: 'hospital',
    component: AppointmentHospitalComponent,
  },
  {
    path: 'doctor',
    component: AppointmentDoctorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F8AppointmentRoutingModule {}
