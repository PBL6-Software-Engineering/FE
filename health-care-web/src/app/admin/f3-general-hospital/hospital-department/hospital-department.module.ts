import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalDepartmentRoutingModule } from './hospital-department-routing.module';
import { HospitalDepartmentListComponent } from './hospital-department-list/hospital-department-list.component';
import { HospitalDepartmentCreateComponent } from './hospital-department-create/hospital-department-create.component';
import { HospitalDepartmentEditComponent } from './hospital-department-edit/hospital-department-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CoreModule } from 'src/app/core/core.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    HospitalDepartmentListComponent,
    HospitalDepartmentCreateComponent,
    HospitalDepartmentEditComponent,
  ],
  imports: [
    CommonModule,
    HospitalDepartmentRoutingModule,
    InlineSVGModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class HospitalDepartmentModule {}
