import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentCreateComponent } from './department-create/department-create.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';
import { InlineSVGModule } from 'ng-inline-svg-2/lib_commonjs/inline-svg.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    InlineSVGModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
})
export class DepartmentModule {}
