import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalDepartmentListComponent } from './hospital-department-list/hospital-department-list.component';
import { HospitalDepartmentCreateComponent } from './hospital-department-create/hospital-department-create.component';
import { HospitalDepartmentEditComponent } from './hospital-department-edit/hospital-department-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HospitalDepartmentListComponent,
  },
  {
    path: 'create',
    component: HospitalDepartmentCreateComponent,
  },
  {
    path: 'edit/:id',
    component: HospitalDepartmentEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalDepartmentRoutingModule { }
