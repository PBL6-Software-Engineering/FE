import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F8PatientListComponent } from './f8-patient-list/f8-patient-list.component';
import { F8PatientCreateComponent } from './f8-patient-create/f8-patient-create.component';
import { F8PatientDetailComponent } from './f8-patient-detail/f8-patient-detail.component';
import { F8PatientEditComponent } from './f8-patient-edit/f8-patient-edit.component';

const routes: Routes = [
  {
    path: '',
    component: F8PatientListComponent,
  },
  {
    path: 'create',
    component: F8PatientCreateComponent,
  },
  {
    path: 'edit/:id',
    component: F8PatientEditComponent,
  },
  {
    path: 'detail/:id',
    component: F8PatientDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F8PatientRoutingModule {}
