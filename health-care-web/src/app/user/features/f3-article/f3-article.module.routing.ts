import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F3ArticleDetailComponent } from './f3-article-detail/f3-article-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: F3ArticleDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F3ArticleRoutingModule {}
