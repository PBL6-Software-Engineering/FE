import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F12HealthInsuranceComponent } from './f12-health-insurance.component';
import { F12HealthInsuranceRoutingModule } from './f12-health-insurance-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HealthInsuranceCreateComponent } from './health-insurance-create/health-insurance-create.component';
import { HealthInsuranceEditComponent } from './health-insurance-edit/health-insurance-edit.component';
import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [
    F12HealthInsuranceComponent,
    HealthInsuranceCreateComponent,
    HealthInsuranceEditComponent,
  ],
  imports: [
    CommonModule,
    F12HealthInsuranceRoutingModule,
    CoreModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
  ],
})
export class F12HealthInsuranceModule {}
