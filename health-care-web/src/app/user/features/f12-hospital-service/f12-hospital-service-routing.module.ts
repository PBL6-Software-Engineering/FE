import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F12HospitalServiceDetailComponent } from './f12-hospital-service-detail/f12-hospital-service-detail.component';

const routes: Routes = [
  {
    path: '',
    component: F12HospitalServiceDetailComponent,
  },
  {
    path: ':slug/:id',
    component: F12HospitalServiceDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F12HospitalServiceRoutingModule {}
