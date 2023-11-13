import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F4HospitalComponent } from './f4-hospital.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';

const routes: Routes = [
  {
    path: '',
    component: HospitalListComponent,
  },
  {
    path: 'tim-kiem/:textSearch',
    component: HospitalListComponent,
  },
  {
    path: 'chi-tiet/:id',
    component: F4HospitalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F4HospitalRoutingModule {}
