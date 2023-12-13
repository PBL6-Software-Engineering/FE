import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F4HospitalRoutingModule } from './f4-hospital-routing.module';
import { F4HospitalComponent } from './f4-hospital.component';
import { HospitalInfoComponent } from './hospital-info/hospital-info.component';
import { HospitalServiceComponent } from './hospital-service/hospital-service.component';
import { HospitalDoctorComponent } from './hospital-doctor/hospital-doctor.component';
import { BookingHospitalComponent } from './booking-hospital/booking-hospital.component';
import { CoreModule } from 'src/app/core/core.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { F1HomePageModule } from '../f1-home-page/f1-home-page.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';

@NgModule({
  declarations: [
    F4HospitalComponent,
    HospitalInfoComponent,
    HospitalServiceComponent,
    HospitalDoctorComponent,
    BookingHospitalComponent,
    HospitalListComponent,
    ConfirmBookingComponent,
  ],
  imports: [
    CommonModule,
    F4HospitalRoutingModule,
    CoreModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    TagModule,
    NgxSpinnerModule,
    F1HomePageModule,
    NgxSkeletonLoaderModule,
  ],
})
export class F4HospitalModule {}
