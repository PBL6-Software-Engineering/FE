import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {F3ConfigurationComponent,} from './f3-configuration.component';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {DropdownMenusModule,} from 'src/app/template/partials';
import {F3ConfigurationAddComponent} from './f3-configuration-add/f3-configuration-add.component';
import {F3ConfigurationUpdateComponent} from './f3-configuration-update/f3-configuration-update.component';
import {F3ConfigurationDetailComponent} from "./f3-configuration-detail/f3-configuration-detail.component";
import {F3ConfigurationReadComponent} from "./f3-configuration-read/f3-configuration-read.component";
import {CoordinatesModule} from "src/app/core/pipes/coordinates/coordinates.module";

@NgModule({
  declarations: [
    F3ConfigurationComponent,
    F3ConfigurationAddComponent,
    F3ConfigurationUpdateComponent,
    F3ConfigurationDetailComponent,
    F3ConfigurationReadComponent
  ],

  imports: [
    // TransferHttpCacheModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: ':idDevice',
        component: F3ConfigurationComponent,
        children: [
          {
            path: '',
            component: F3ConfigurationDetailComponent,
            pathMatch: 'full'
          },
          {
            path: 'read',
            component: F3ConfigurationReadComponent,
          },
          {
            path: 'add/:lastPosition',
            component: F3ConfigurationAddComponent,
          },
          {
            path: 'update/:id',
            component: F3ConfigurationUpdateComponent,
          },
        ]
      },
    ]),

    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),

    InlineSVGModule,
    DropdownMenusModule,
    CoordinatesModule
  ],
  exports: [
    F3ConfigurationAddComponent
  ],
  entryComponents: []
})
export class F3ConfigurationModule {
}
