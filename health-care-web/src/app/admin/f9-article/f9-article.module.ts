import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F9ArticleRoutingModule } from './f9-article-routing.module';
import { F9ArticleListComponent } from './f9-article-list/f9-article-list.component';
import { F9ArticleCreateComponent } from './f9-article-create/f9-article-create.component';
import { F9ArticleEditComponent } from './f9-article-edit/f9-article-edit.component';
import { F9ArticleDetailComponent } from './f9-article-detail/f9-article-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    F9ArticleListComponent,
    F9ArticleCreateComponent,
    F9ArticleEditComponent,
    F9ArticleDetailComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    F9ArticleRoutingModule,
    NgSelectModule,
    QuillModule,
    NgxSpinnerModule,
    CoreModule,
  ],
})
export class F9ArticleModule {}
