import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F5DepartmentListComponent } from './f5-department-list/f5-department-list.component';

const routes: Routes = [
  {
    path: '',
    component: F5DepartmentListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F5DepartmentRoutingModule {}
