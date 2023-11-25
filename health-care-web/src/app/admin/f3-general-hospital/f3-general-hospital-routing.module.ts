import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'department',
    loadChildren: () =>
      import('./hospital-department/hospital-department.module').then(
        (m) => m.HospitalDepartmentModule,
      ),
  },
  {
    path: 'service',
    loadChildren: () =>
      import('./hospital-service/hospital-service.module').then(
        (m) => m.HospitalServiceModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F3GeneralRoutingModule {}
