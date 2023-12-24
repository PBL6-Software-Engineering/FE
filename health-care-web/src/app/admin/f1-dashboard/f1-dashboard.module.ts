import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F1DashboardComponent } from './f1-dashboard.component';
import { F1DashboardRoutingModule } from './f1-dashboard-routing.nodule';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardHospitalComponent } from './dashboard-hospital/dashboard-hospital.component';

@NgModule({
  declarations: [
    F1DashboardComponent,
    DashboardAdminComponent,
    DashboardHospitalComponent,
  ],
  imports: [CommonModule, F1DashboardRoutingModule],
})
export class F1DashboardModule {}
