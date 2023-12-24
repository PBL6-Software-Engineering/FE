import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentHospitalComponent } from './appointment-hospital/appointment-hospital.component';
import { AppointmentDoctorComponent } from './appointment-doctor/appointment-doctor.component';
import { ModifyInfoPatientComponent } from './modify-info-patient/modify-info-patient.component';
import { ViewInfoPatientComponent } from './view-info-patient/view-info-patient.component';

const routes: Routes = [
  {
    path: 'doctor',
    component: AppointmentDoctorComponent,
  },
  {
    path: 'hospital',
    component: AppointmentHospitalComponent,
  },
  {
    path: 'hospital/edit-info-patient',
    component: ModifyInfoPatientComponent,
  },
  {
    path: 'doctor/view-info-patient',
    component: ViewInfoPatientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F8AppointmentRoutingModule {}
