import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { F1TypeDeviceComponent, } from './f1-type-device.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule, } from 'src/app/template/partials';
import { F1TypeDeviceAddComponent } from './f1-type-device-add/f1-type-device-add.component';
import { F1TypeDeviceUpdateComponent } from './f1-type-device-update/f1-type-device-update.component';
import {F1TypeDeviceSearchComponent} from "./f1-type-device-search/f1-type-device-search.component";

@NgModule({
    declarations: [
        F1TypeDeviceComponent,
        F1TypeDeviceAddComponent,
        F1TypeDeviceUpdateComponent,
        F1TypeDeviceSearchComponent
    ],

    imports: [
        // TransferHttpCacheModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: F1TypeDeviceComponent, children: [],
            },
            {
                path: 'add',
                component: F1TypeDeviceAddComponent,
            },
            {
                path: 'update/:id',
                component: F1TypeDeviceUpdateComponent,
            },
        ]),
        FormsModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),

        InlineSVGModule,
        DropdownMenusModule
    ],
    exports: [
        F1TypeDeviceAddComponent
    ],
    entryComponents: []
})
export class F1TypeDeviceModule { }
