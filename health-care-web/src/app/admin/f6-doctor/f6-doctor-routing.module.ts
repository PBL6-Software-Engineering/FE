import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F6DoctorCreateComponent } from './f6-doctor-create/f6-doctor-create.component';
import { F6DoctorDetailComponent } from './f6-doctor-detail/f6-doctor-detail.component';
import { F6DoctorEditComponent } from './f6-doctor-edit/f6-doctor-edit.component';
import { F6DoctorListComponent } from './f6-doctor-list/f6-doctor-list.component';

const routes: Routes = [
  {
    path: '',
    component: F6DoctorListComponent,
  },
  {
    path: 'create',
    component: F6DoctorCreateComponent,
  },
  {
    path: 'edit/:id',
    component: F6DoctorEditComponent,
  },
  {
    path: 'detail/:id',
    component: F6DoctorDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F6DoctorRoutingModule {}
