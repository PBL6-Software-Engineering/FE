import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F3ArticleRoutingModule } from './f3-article.module.routing';
import { RouterModule } from '@angular/router';
import { F3ArticleDetailComponent } from './f3-article-detail/f3-article-detail.component';

@NgModule({
  declarations: [F3ArticleDetailComponent],
  imports: [CommonModule, F3ArticleRoutingModule, RouterModule],
})
export class F3ArticleModule {}
