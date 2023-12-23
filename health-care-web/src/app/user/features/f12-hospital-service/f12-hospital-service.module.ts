import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F12HospitalServiceRoutingModule } from './f12-hospital-service-routing.module';
import { F12HospitalServiceDetailComponent } from './f12-hospital-service-detail/f12-hospital-service-detail.component';
import { CoreModule } from 'src/app/core/core.module';
import { BookingServiceComponent } from './booking-service/booking-service.component';
import { ConfirmBookingServiceComponent } from './confirm-booking-service/confirm-booking-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [
    F12HospitalServiceDetailComponent,
    BookingServiceComponent,
    ConfirmBookingServiceComponent,
  ],
  imports: [
    CommonModule,
    F12HospitalServiceRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    TagModule,
    NgxSpinnerModule,
  ],
})
export class F12HospitalServiceModule {}
