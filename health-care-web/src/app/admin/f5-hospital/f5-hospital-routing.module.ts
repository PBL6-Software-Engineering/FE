import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F5HospitalListComponent } from './f5-hospital-list/f5-hospital-list.component';
import { F5HospitalCreateComponent } from './f5-hospital-create/f5-hospital-create.component';
import { F5HospitalEditComponent } from './f5-hospital-edit/f5-hospital-edit.component';
import { F5HospitalDetailComponent } from './f5-hospital-detail/f5-hospital-detail.component';

const routes: Routes = [
  {
    path: '',
    component: F5HospitalListComponent,
  },
  {
    path: 'create',
    component: F5HospitalCreateComponent,
  },
  {
    path: 'edit/:id',
    component: F5HospitalEditComponent,
  },
  {
    path: 'detail/:id',
    component: F5HospitalDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F5HospitalRoutingModule {}
