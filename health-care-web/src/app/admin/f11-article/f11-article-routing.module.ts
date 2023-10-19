import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F11ArticleListComponent } from './f11-article-list/f11-article-list.component';
import { F11ArticleCreateComponent } from './f11-article-create/f11-article-create.component';
import { F11ArticleDetailComponent } from './f11-article-detail/f11-article-detail.component';
import { F11ArticleEditComponent } from './f11-article-edit/f11-article-edit.component';

const routes: Routes = [
  {
    path: '',
    component: F11ArticleListComponent,
  },
  {
    path: 'create',
    component: F11ArticleCreateComponent,
  },
  {
    path: 'edit/:id',
    component: F11ArticleEditComponent,
  },
  {
    path: 'detail/:id',
    component: F11ArticleDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F11ArticleRoutingModule {}
