import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {F4LogComponent,} from './f4-log.component';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {DropdownMenusModule,} from 'src/app/template/partials';
import {F4LogSearchComponent} from "./f4-log-search/f4-log-search.component";
import {F4LogFilterComponent} from "./f4-log-filter/f4-log-filter.component";

@NgModule({
  declarations: [
    F4LogComponent,
    F4LogSearchComponent,
    F4LogFilterComponent,
  ],

  imports: [
    // TransferHttpCacheModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: F4LogComponent, children: [],
      },
    ]),
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),

    InlineSVGModule,
    DropdownMenusModule,

  ],
  entryComponents: []
})
export class F4LogModule {
}
