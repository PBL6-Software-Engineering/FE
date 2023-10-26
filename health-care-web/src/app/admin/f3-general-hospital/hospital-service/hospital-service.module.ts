import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalServiceRoutingModule } from './hospital-service-routing.module';
import { HospitalServiceCreateComponent } from './hospital-service-create/hospital-service-create.component';
import { HospitalServiceListComponent } from './hospital-service-list/hospital-service-list.component';
import { HospitalServiceEditComponent } from './hospital-service-edit/hospital-service-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CoreModule } from 'src/app/core/core.module';
import { HospitalServiceDetailComponent } from './hospital-service-detail/hospital-service-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    HospitalServiceCreateComponent,
    HospitalServiceListComponent,
    HospitalServiceEditComponent,
    HospitalServiceDetailComponent,
  ],
  imports: [
    CommonModule,
    HospitalServiceRoutingModule,
    InlineSVGModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class HospitalServiceModule {}
