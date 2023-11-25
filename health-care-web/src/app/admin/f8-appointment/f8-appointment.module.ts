import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F8AppointmentRoutingModule } from './f8-appointment-routing.module';
import { AppointmentDoctorComponent } from './appointment-doctor/appointment-doctor.component';
import { AppointmentHospitalComponent } from './appointment-hospital/appointment-hospital.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AppointmentDoctorComponent, AppointmentHospitalComponent],
  imports: [
    CommonModule,
    F8AppointmentRoutingModule,
    CoreModule,
    FormsModule,
    FullCalendarModule,
    NgxSpinnerModule,
    NgSelectModule,
  ],
})
export class F8AppointmentModule {}