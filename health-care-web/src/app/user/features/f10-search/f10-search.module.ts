import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalSearchComponent } from './hospital-search/hospital-search.component';
import { ExpertSearchComponent } from './expert-search/expert-search.component';
import { ServiceSearchComponent } from './service-search/service-search.component';
import { F10SearchComponent } from './f10-search.component';
import { F10SearchRoutingModule } from './f10-search.module.routing';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule } from '@angular/forms';
import { ShareModuleModule } from '../../share-module/share-module.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExpertCardComponent } from './expert-search/expert-card/expert-card.component';
import { DepartmentSearchComponent } from './department-search/department-search.component';
import { DepartmentCardComponent } from './department-search/department-card/department-card.component';
@NgModule({
  declarations: [
    HospitalSearchComponent,
    ExpertSearchComponent,
    ServiceSearchComponent,
    F10SearchComponent,
    ExpertCardComponent,
    DepartmentSearchComponent,
    DepartmentCardComponent,
  ],
  imports: [
    CommonModule,
    F10SearchRoutingModule,
    RouterModule,
    NgxSpinnerModule,
    NgxSkeletonLoaderModule,
    CoreModule,
    FormsModule,
    NgSelectModule,
    ShareModuleModule,
  ],
})
export class F10SearchModule {}
