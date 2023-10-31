import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHealthRoutingModule } from './user-health-routing.module';
import { UserHealthComponent } from './user-health.component';
import { FormsModule } from '@angular/forms';
import { HealthScreenersComponent } from './health-screeners/health-screeners.component';
import { CoreModule } from 'src/app/core/core.module';
import { HealthTrackerComponent } from './health-tracker/health-tracker.component';

@NgModule({
  declarations: [
    UserHealthComponent,
    HealthScreenersComponent,
    HealthTrackerComponent,
  ],
  imports: [CommonModule, FormsModule, UserHealthRoutingModule, CoreModule],
})
export class UserHealthModule {}
