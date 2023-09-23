import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHealthComponent } from './user-health.component';
import { HealthTrackerComponent } from './health-tracker/health-tracker.component';
import { HealthParentingComponent } from './health-parenting/health-parenting.component';
import { HealthScreenersComponent } from './health-screeners/health-screeners.component';

const routes: Routes = [
  {
    path: '',
    component: UserHealthComponent,
    children: [
      {
        path: 'trackers',
        component: HealthTrackerComponent
      },
      {
        path: 'screeners',
        component: HealthScreenersComponent
      },
      {
        path: 'parenting',
        component: HealthParentingComponent
      },
      {
        path: '',
        redirectTo: 'trackers',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'trackers',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserHealthRoutingModule { }
