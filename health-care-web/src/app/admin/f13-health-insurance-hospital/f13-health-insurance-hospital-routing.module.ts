import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F13HealthInsuranceHospitalComponent } from './f13-health-insurance-hospital.component';
const routes: Routes = [
  {
    path: '',
    component: F13HealthInsuranceHospitalComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F13HealthInsuranceHospitalRoutingModule {}
