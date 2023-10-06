import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F8PatientRoutingModule } from './f8-patient-routing.module';
import { F8PatientListComponent } from './f8-patient-list/f8-patient-list.component';
import { F8PatientCreateComponent } from './f8-patient-create/f8-patient-create.component';
import { F8PatientEditComponent } from './f8-patient-edit/f8-patient-edit.component';
import { F8PatientDetailComponent } from './f8-patient-detail/f8-patient-detail.component';


@NgModule({
  declarations: [
    F8PatientListComponent,
    F8PatientCreateComponent,
    F8PatientEditComponent,
    F8PatientDetailComponent
  ],
  imports: [
    CommonModule,
    F8PatientRoutingModule
  ]
})
export class F8PatientModule { }
