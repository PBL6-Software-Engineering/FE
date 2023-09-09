import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {F8WarningComponent,} from './f8-warning.component';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {DropdownMenusModule,} from 'src/app/template/partials';
import {F8WarningSearchComponent} from "./f8-warning-search/f8-warning-search.component";
import {F8WarningFilterComponent} from "./f8-warning-filter/f8-warning-filter.component";
import {CKEditorModule} from "ckeditor4-angular";

@NgModule({
  declarations: [
    F8WarningComponent,
    F8WarningSearchComponent,
    F8WarningFilterComponent
  ],

  imports: [
    // TransferHttpCacheModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: F8WarningComponent, children: [],
      },
    ]),
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),

    InlineSVGModule,
    DropdownMenusModule,
    CKEditorModule
  ],
  exports: [],
  entryComponents: []
})
export class F8WarningModule {
}
