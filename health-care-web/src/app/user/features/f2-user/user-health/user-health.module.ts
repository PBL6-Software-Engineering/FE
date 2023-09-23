import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHealthRoutingModule } from './user-health-routing.module';
import { UserHealthComponent } from './user-health.component';
import { FormsModule } from '@angular/forms';
import { HealthScreenersComponent } from './health-screeners/health-screeners.component';

@NgModule({
  declarations: [
    UserHealthComponent,
    HealthScreenersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserHealthRoutingModule
  ]
})
export class UserHealthModule { }
