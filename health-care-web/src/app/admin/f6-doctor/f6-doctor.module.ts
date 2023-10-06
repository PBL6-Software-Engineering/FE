import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F6DoctorRoutingModule } from './f6-doctor-routing.module';
import { F6DoctorListComponent } from './f6-doctor-list/f6-doctor-list.component';
import { F6DoctorCreateComponent } from './f6-doctor-create/f6-doctor-create.component';
import { F6DoctorEditComponent } from './f6-doctor-edit/f6-doctor-edit.component';
import { F6DoctorDetailComponent } from './f6-doctor-detail/f6-doctor-detail.component';


@NgModule({
  declarations: [
    F6DoctorListComponent,
    F6DoctorCreateComponent,
    F6DoctorEditComponent,
    F6DoctorDetailComponent
  ],
  imports: [
    CommonModule,
    F6DoctorRoutingModule
  ]
})
export class F6DoctorModule { }
