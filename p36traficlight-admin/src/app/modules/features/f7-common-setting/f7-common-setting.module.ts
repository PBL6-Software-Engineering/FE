import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {F7CommonSettingComponent,} from './f7-common-setting.component';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {DropdownMenusModule,} from 'src/app/template/partials';
import {F7CommonSettingAddComponent} from './f7-common-setting-add/f7-common-setting-add.component';
import {F7CommonSettingUpdateComponent} from './f7-common-setting-update/f7-common-setting-update.component';
import {F7CommonSettingSearchComponent} from "./f7-common-setting-search/f7-common-setting-search.component";

@NgModule({
  declarations: [
    F7CommonSettingComponent,
    F7CommonSettingAddComponent,
    F7CommonSettingUpdateComponent,
    F7CommonSettingSearchComponent
  ],

  imports: [
    // TransferHttpCacheModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: F7CommonSettingComponent, children: [],
      },
      {
        path: 'add',
        component: F7CommonSettingAddComponent,
      },
      {
        path: 'update/:id',
        component: F7CommonSettingUpdateComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),

    InlineSVGModule,
    DropdownMenusModule
  ],
  exports: [
    F7CommonSettingAddComponent
  ],
  entryComponents: []
})
export class F7CommonSettingModule {
}
