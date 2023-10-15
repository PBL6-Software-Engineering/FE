import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentCreateComponent } from './department-create/department-create.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';
import { DepartmentListComponent } from './department-list/department-list.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentListComponent,
  },
  {
    path: 'create',
    component: DepartmentCreateComponent,
  },
  {
    path: 'edit/:id',
    component: DepartmentEditComponent,
  },
  {
    path: 'detail/:id',
    component: DepartmentDetailComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutingModule {}
