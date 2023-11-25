import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F3ArticleRoutingModule } from './f3-article.module.routing';
import { RouterModule } from '@angular/router';
import { F3ArticleDetailComponent } from './f3-article-detail/f3-article-detail.component';
import { F3ArticleListComponent } from './f3-article-list/f3-article-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { ShareModuleModule } from '../../share-module/share-module.module';

@NgModule({
  declarations: [F3ArticleDetailComponent, F3ArticleListComponent],
  imports: [
    CommonModule,
    F3ArticleRoutingModule,
    RouterModule,
    NgxSpinnerModule,
    NgxSkeletonLoaderModule,
    CoreModule,
    FormsModule,
    ShareModuleModule,
  ],
})
export class F3ArticleModule {}
