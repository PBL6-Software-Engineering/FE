import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleImgTopComponent } from './components/article-img-top/article-img-top.component';
import { ArticleImgLeftComponent } from './components/article-img-left/article-img-left.component';
import { CallBmiComponent } from './components/call-bmi/call-bmi.component';
import { Call } from '@angular/compiler';

@NgModule({
  declarations: [
    ArticleImgTopComponent,
    ArticleImgLeftComponent,
    CallBmiComponent,
  ],
  imports: [CommonModule],
  exports: [ArticleImgTopComponent, ArticleImgLeftComponent, CallBmiComponent],
})
export class ShareModuleModule {}
