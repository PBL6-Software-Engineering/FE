import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F6CategoryRoutingModule } from './f6-category-routing.module';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { ShareModuleModule } from '../../share-module/share-module.module';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { CateCardComponent } from './cate-card/cate-card.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { F1HomePageModule } from '../f1-home-page/f1-home-page.module';

@NgModule({
  declarations: [
    CategoryDetailComponent,
    CategoriesComponent,
    DoctorCardComponent,
    CateCardComponent,
  ],
  imports: [
    CommonModule,
    F6CategoryRoutingModule,
    ShareModuleModule,
    FormsModule,
    CoreModule,
    F1HomePageModule,
  ],
})
export class F6CategoryModule {}
