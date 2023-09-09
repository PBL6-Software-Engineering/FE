import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CKEditorModule } from 'ckeditor4-angular';
import { F6DeviceErrorAddComponent } from './f6-device-error-add/f6-device-error-add.component';
import { F6DeviceErrorUpdateComponent } from './f6-device-error-update/f6-device-error-update.component';
import { F6DeviceErrorSearchComponent } from './f6-device-error-search/f6-device-error-search.component';
import { F6DeviceErrorComponent } from './f6-device-error.component';

@NgModule({
  declarations: [
    F6DeviceErrorComponent,
    F6DeviceErrorAddComponent,
    F6DeviceErrorUpdateComponent,
    F6DeviceErrorSearchComponent,
  ],
  imports: [
    CKEditorModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: F6DeviceErrorComponent,
        children: [],
      },
      {
        path: 'add',
        component: F6DeviceErrorAddComponent,
      },
      {
        path: 'update/:id',
        component: F6DeviceErrorUpdateComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),

    InlineSVGModule,
  ],
  entryComponents: [],
  providers: [DatePipe],
})
export class F6DeviceErrorModule {}
