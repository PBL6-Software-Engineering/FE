import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F13HealthInsuranceHospitalComponent } from './f13-health-insurance-hospital.component';
import { F13HealthInsuranceHospitalRoutingModule } from './f13-health-insurance-hospital-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    F13HealthInsuranceHospitalComponent,
  ],
  imports: [
    CommonModule,
    F13HealthInsuranceHospitalRoutingModule,
    CoreModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    NgSelectModule,
  ],
})
export class F13HealthInsuranceHospitalModule {}
