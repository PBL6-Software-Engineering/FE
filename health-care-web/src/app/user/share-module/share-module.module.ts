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
import { CardLoaderArticleComponent } from './components/card-loader-article/card-loader-article.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    ArticleImgTopComponent,
    ArticleImgLeftComponent,
    CallBmiComponent,
    ArticleImgTopNoContentComponent,
    ArticleImgLeft2Component,
    ArticleImgRightComponent,
    CardLoaderArticleComponent,
  ],
  imports: [CommonModule, CoreModule, RouterModule, NgxSkeletonLoaderModule],
  exports: [
    ArticleImgTopComponent,
    ArticleImgLeftComponent,
    CallBmiComponent,
    ArticleImgLeft2Component,
    ArticleImgTopNoContentComponent,
    ArticleImgRightComponent,
    CardLoaderArticleComponent
  ],
})
export class ShareModuleModule {}
