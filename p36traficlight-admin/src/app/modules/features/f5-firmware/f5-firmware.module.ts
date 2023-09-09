import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CKEditorModule } from 'ckeditor4-angular';
import { F5FirmwareAddComponent } from './f5-firmware-add/f5-firmware-add.component';
import { F5FirmwareUpdateComponent } from './f5-firmware-update/f5-firmware-update.component';
import { F5FirmwareSearchComponent } from './f5-firmware-search/f5-firmware-search.component';
import { F5FirmwareComponent } from './f5-firmware.component';

@NgModule({
  declarations: [
    F5FirmwareComponent,
    F5FirmwareAddComponent,
    F5FirmwareUpdateComponent,
    F5FirmwareSearchComponent,
  ],
  imports: [
    CKEditorModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: F5FirmwareComponent,
        children: [],
      },
      {
        path: 'add',
        component: F5FirmwareAddComponent,
      },
      {
        path: 'update/:id',
        component: F5FirmwareUpdateComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),

    InlineSVGModule,
  ],
  entryComponents: [],
  providers: [DatePipe],
})
export class F5FirmwareModule {}
