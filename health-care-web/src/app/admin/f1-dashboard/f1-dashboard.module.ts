import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F1DashboardComponent } from './f1-dashboard.component';
import { F1DashboardRoutingModule } from './f1-dashboard-routing.nodule';

@NgModule({
  declarations: [
    F1DashboardComponent,
  ],
  imports: [CommonModule, F1DashboardRoutingModule],
})
export class F1DashboardModule {}
