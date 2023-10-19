import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F11ArticleRoutingModule } from './f11-article-routing.module';
import { F11ArticleListComponent } from './f11-article-list/f11-article-list.component';
import { F11ArticleCreateComponent } from './f11-article-create/f11-article-create.component';
import { F11ArticleEditComponent } from './f11-article-edit/f11-article-edit.component';
import { F11ArticleDetailComponent } from './f11-article-detail/f11-article-detail.component';


@NgModule({
  declarations: [
    F11ArticleListComponent,
    F11ArticleCreateComponent,
    F11ArticleEditComponent,
    F11ArticleDetailComponent
  ],
  imports: [
    CommonModule,
    F11ArticleRoutingModule
  ]
})
export class F11ArticleModule { }
