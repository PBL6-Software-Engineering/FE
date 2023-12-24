import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F12HealthInsuranceComponent } from './f12-health-insurance.component';
const routes: Routes = [
  {
    path: '',
    component: F12HealthInsuranceComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F12HealthInsuranceRoutingModule {}
