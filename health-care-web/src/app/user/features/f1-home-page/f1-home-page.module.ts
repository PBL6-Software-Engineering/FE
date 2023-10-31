import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F1HomePageComponent } from './f1-home-page.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { ShareModuleModule } from '../../share-module/share-module.module';
import { DownloadAppComponent } from './download-app/download-app.component';
import { CarouselCategoryComponent } from './carousel-category/carousel-category.component';
import { StepBookingComponent } from './step-booking/step-booking.component';
import { BannerSearchComponent } from './banner-search/banner-search.component';
import { FeaturedNewsComponent } from './featured-news/featured-news.component';
import { ArticleTopicsComponent } from './article-topics/article-topics.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    F1HomePageComponent,
    DownloadAppComponent,
    CarouselCategoryComponent,
    StepBookingComponent,
    BannerSearchComponent,
    FeaturedNewsComponent,
    ArticleTopicsComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    CoreModule,
    ShareModuleModule,
    NgxSpinnerModule,
  ],
})
export class F1HomePageModule {}
