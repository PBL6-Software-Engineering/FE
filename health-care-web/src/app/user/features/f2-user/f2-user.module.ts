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
  ],
  imports: [
    CommonModule,
    F2UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
  ],
})
export class F2UserModule {}
