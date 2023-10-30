import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F6CategoryRoutingModule } from './f6-category-routing.module';
import { F6CategoryComponent } from './f6-category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { ShareModuleModule } from '../../share-module/share-module.module';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { CateCardComponent } from './cate-card/cate-card.component';

@NgModule({
  declarations: [
    F6CategoryComponent,
    CategoryDetailComponent,
    CategoriesComponent,
    DoctorCardComponent,
    CateCardComponent,
  ],
  imports: [CommonModule, F6CategoryRoutingModule, ShareModuleModule],
})
export class F6CategoryModule {}
