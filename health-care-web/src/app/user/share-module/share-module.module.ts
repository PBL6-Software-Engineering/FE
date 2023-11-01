import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleImgTopComponent } from './components/article-img-top/article-img-top.component';
import { ArticleImgLeftComponent } from './components/article-img-left/article-img-left.component';
import { CallBmiComponent } from './components/call-bmi/call-bmi.component';
import { Call } from '@angular/compiler';
import { ArticleImgTopNoContentComponent } from './components/article-img-top-no-content/article-img-top-no-content.component';
import { ArticleImgLeft2Component } from './components/article-img-left2/article-img-left2.component';

@NgModule({
  declarations: [
    ArticleImgTopComponent,
    ArticleImgLeftComponent,
    CallBmiComponent,
    ArticleImgTopNoContentComponent,
    ArticleImgLeft2Component,
  ],
  imports: [CommonModule],
  exports: [
    ArticleImgTopComponent,
    ArticleImgLeftComponent,
    CallBmiComponent,
    ArticleImgLeft2Component,
    ArticleImgTopNoContentComponent,
  ],
})
export class ShareModuleModule {}
