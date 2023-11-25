import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F2UserComponent } from './f2-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSavedComponent } from './user-saved/user-saved.component';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { UserSubscriptionsComponent } from './user-subscriptions/user-subscriptions.component';
import { UserPasswordComponent } from './user-password/user-password.component';
import { UserDisableAccountComponent } from './user-disable-account/user-disable-account.component';
import { UserHelpComponent } from './user-help/user-help.component';

const routes: Routes = [
  {
    path: '',
    component: F2UserComponent,
    children: [
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'health',
        loadChildren: () =>
          import('./user-health/user-health.module').then(
            (m) => m.UserHealthModule,
          ),
      },
      {
        path: 'saved',
        component: UserSavedComponent,
      },
      {
        path: 'booking',
        component: UserBookingComponent,
      },
      {
        path: 'subscriptions',
        component: UserSubscriptionsComponent,
      },
      {
        path: 'password',
        component: UserPasswordComponent,
      },
      {
        path: 'disable-account',
        component: UserDisableAccountComponent,
      },
      {
        path: 'help',
        component: UserHelpComponent,
      },
      {
        path: '**',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F2UserRoutingModule {}
