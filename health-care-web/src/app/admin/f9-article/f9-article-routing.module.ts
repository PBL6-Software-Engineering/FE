import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F9ArticleListComponent } from './f9-article-list/f9-article-list.component';
import { F9ArticleCreateComponent } from './f9-article-create/f9-article-create.component';
import { F9ArticleDetailComponent } from './f9-article-detail/f9-article-detail.component';
import { F9ArticleEditComponent } from './f9-article-edit/f9-article-edit.component';

const routes: Routes = [
  {
    path: '',
    component: F9ArticleListComponent,
  },
  {
    path: 'create',
    component: F9ArticleCreateComponent,
  },
  {
    path: 'edit/:id',
    component: F9ArticleEditComponent,
  },
  {
    path: 'detail/:id',
    component: F9ArticleDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F9ArticleRoutingModule {}
