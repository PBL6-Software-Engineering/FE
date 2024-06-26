import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F2UserComponent } from './f2-user.component';
import { F2UserRoutingModule } from './f2-user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSavedComponent } from './user-saved/user-saved.component';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { UserSubscriptionsComponent } from './user-subscriptions/user-subscriptions.component';
import { UserPasswordComponent } from './user-password/user-password.component';
import { UserDisableAccountComponent } from './user-disable-account/user-disable-account.component';
import { UserHelpComponent } from './user-help/user-help.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { CalendarComponent } from './calendar/calendar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FullCalendarModule } from '@fullcalendar/angular';
import { UserRatingComponent } from './user-rating/user-rating.component';

@NgModule({
  declarations: [
    F2UserComponent,
    UserProfileComponent,
    UserSavedComponent,
    UserBookingComponent,
    UserSubscriptionsComponent,
    UserPasswordComponent,
    UserDisableAccountComponent,
    UserHelpComponent,
    CalendarComponent,
    UserRatingComponent,
  ],
  imports: [
    CommonModule,
    F2UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    NgxSpinnerModule,
    FullCalendarModule,
  ],
})
export class F2UserModule {}
