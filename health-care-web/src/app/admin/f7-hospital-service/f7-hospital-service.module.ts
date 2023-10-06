import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F7HospitalServiceRoutingModule } from './f7-hospital-service-routing.module';
import { F7HospitalServiceListComponent } from './f7-hospital-service-list/f7-hospital-service-list.component';
import { F7HospitalServiceCreateComponent } from './f7-hospital-service-create/f7-hospital-service-create.component';
import { F7HospitalServiceEditComponent } from './f7-hospital-service-edit/f7-hospital-service-edit.component';
import { F7HospitalServiceDetailComponent } from './f7-hospital-service-detail/f7-hospital-service-detail.component';


@NgModule({
  declarations: [
    F7HospitalServiceListComponent,
    F7HospitalServiceCreateComponent,
    F7HospitalServiceEditComponent,
    F7HospitalServiceDetailComponent
  ],
  imports: [
    CommonModule,
    F7HospitalServiceRoutingModule
  ]
})
export class F7HospitalServiceModule { }
