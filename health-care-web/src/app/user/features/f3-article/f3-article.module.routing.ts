import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F3ArticleDetailComponent } from './f3-article-detail/f3-article-detail.component';
import { F3ArticleListComponent } from './f3-article-list/f3-article-list.component';

const routes: Routes = [
  {
    path: '',
    component: F3ArticleListComponent,
  },
  {
    path: 'tim-kiem/:slug',
    component: F3ArticleListComponent,
  },
  {
    path: ':id/:slug-name-category',
    component: F3ArticleDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F3ArticleRoutingModule {}
