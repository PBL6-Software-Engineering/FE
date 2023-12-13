import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleImgTopComponent } from './components/article-img-top/article-img-top.component';
import { ArticleImgLeftComponent } from './components/article-img-left/article-img-left.component';
import { CallBmiComponent } from './components/call-bmi/call-bmi.component';
import { ArticleImgTopNoContentComponent } from './components/article-img-top-no-content/article-img-top-no-content.component';
import { ArticleImgLeft2Component } from './components/article-img-left2/article-img-left2.component';
import { ArticleImgRightComponent } from './components/article-img-right/article-img-right.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CardLoaderArticleImgTopComponent } from './components/card-loader-article-img-top/card-loader-article-img-top.component';
import { CardLoaderArticleImgLeftComponent } from './components/card-loader-article-img-left/card-loader-article-img-left.component';

@NgModule({
  declarations: [
    ArticleImgTopComponent,
    ArticleImgLeftComponent,
    CallBmiComponent,
    ArticleImgTopNoContentComponent,
    ArticleImgLeft2Component,
    ArticleImgRightComponent,
    CardLoaderArticleImgTopComponent,
    CardLoaderArticleImgLeftComponent,
  ],
  imports: [CommonModule, CoreModule, RouterModule, NgxSkeletonLoaderModule],
  exports: [
    ArticleImgTopComponent,
    ArticleImgLeftComponent,
    CallBmiComponent,
    ArticleImgLeft2Component,
    ArticleImgTopNoContentComponent,
    ArticleImgRightComponent,
    CardLoaderArticleImgLeftComponent,
    CardLoaderArticleImgTopComponent,
  ],
})
export class ShareModuleModule {}
