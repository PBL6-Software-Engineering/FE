import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    InlineSVGModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
})
export class CategoryModule {}
