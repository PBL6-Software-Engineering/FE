import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F5HospitalRoutingModule } from './f5-hospital-routing.module';
import { F5HospitalEditComponent } from './f5-hospital-edit/f5-hospital-edit.component';
import { F5HospitalCreateComponent } from './f5-hospital-create/f5-hospital-create.component';
import { F5HospitalListComponent } from './f5-hospital-list/f5-hospital-list.component';
import { F5HospitalDetailComponent } from './f5-hospital-detail/f5-hospital-detail.component';
import { CoreModule } from 'src/app/core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    F5HospitalEditComponent,
    F5HospitalCreateComponent,
    F5HospitalListComponent,
    F5HospitalDetailComponent,
  ],
  imports: [
    CommonModule,
    F5HospitalRoutingModule,
    CoreModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class F5HospitalModule {}
