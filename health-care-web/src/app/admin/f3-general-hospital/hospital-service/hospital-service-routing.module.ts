import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalServiceCreateComponent } from './hospital-service-create/hospital-service-create.component';
import { HospitalServiceEditComponent } from './hospital-service-edit/hospital-service-edit.component';
import { HospitalServiceListComponent } from './hospital-service-list/hospital-service-list.component';
import { HospitalServiceDetailComponent } from './hospital-service-detail/hospital-service-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HospitalServiceListComponent,
  },
  {
    path: 'create',
    component: HospitalServiceCreateComponent,
  },
  {
    path: 'edit/:id',
    component: HospitalServiceEditComponent,
  },
  {
    path: 'detail/:id',
    component: HospitalServiceDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalServiceRoutingModule {}
