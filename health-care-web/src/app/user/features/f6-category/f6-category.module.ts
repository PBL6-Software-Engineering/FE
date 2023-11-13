import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F6CategoryRoutingModule } from './f6-category-routing.module';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ShareModuleModule } from '../../share-module/share-module.module';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { F1HomePageModule } from '../f1-home-page/f1-home-page.module';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryDetailComponent,
    DoctorCardComponent,
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
