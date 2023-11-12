import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleImgTopComponent } from './components/article-img-top/article-img-top.component';
import { ArticleImgLeftComponent } from './components/article-img-left/article-img-left.component';
import { CallBmiComponent } from './components/call-bmi/call-bmi.component';
import { ArticleImgTopNoContentComponent } from './components/article-img-top-no-content/article-img-top-no-content.component';
import { ArticleImgLeft2Component } from './components/article-img-left2/article-img-left2.component';
import { ArticleImgRightComponent } from './components/article-img-right/article-img-right.component';

@NgModule({
  declarations: [
    ArticleImgTopComponent,
    ArticleImgLeftComponent,
    CallBmiComponent,
    ArticleImgTopNoContentComponent,
    ArticleImgLeft2Component,
    ArticleImgRightComponent,
  ],
  imports: [CommonModule],
  exports: [
    ArticleImgTopComponent,
    ArticleImgLeftComponent,
    CallBmiComponent,
    ArticleImgLeft2Component,
    ArticleImgTopNoContentComponent,
    ArticleImgRightComponent,
  ],
})
export class ShareModuleModule {}
