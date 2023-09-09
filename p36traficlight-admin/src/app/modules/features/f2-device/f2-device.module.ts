import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {DropdownMenusModule,} from 'src/app/template/partials';
import {F2DeviceComponent} from "./f2-device.component";
import {F2DeviceAddComponent} from "./f2-device-add/f2-device-add.component";
import {F2DeviceUpdateComponent} from "./f2-device-update/f2-device-update.component";
import {F2DeviceSearchComponent} from "./f2-device-search/f2-device-search.component";
import {CoordinatesModule} from "src/app/core/pipes/coordinates/coordinates.module";
import {F2DeviceMapComponent} from './f2-device-map/f2-device-map.component';
import {F2DeviceDetailComponent} from "./f2-device-detail/f2-device-detail.component";
import {F2DeviceFilterComponent} from "./f2-device-filter/f2-device-filter.component";
import {F2ControlModalComponent} from "./f2-modal-control/f2-control-modal.component";
import {F2DeviceModalFirmwareComponent} from "./f2-device-modal-firmware/f2-device-modal-firmware.component";
import {F2DeviceModalCommandComponent} from "./f2-device-modal-command/f2-device-modal-command.component";
import {CKEditorModule} from "ckeditor4-angular";
import {F2DeviceModalLostConnectComponent} from "./f2-device-modal-lost-connect/f2-device-modal-lost-connect.component";
import {F2DeviceModalHistoryDataComponent} from "./f2-device-modal-history-data/f2-device-modal-history-data.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {ProgressBarModule} from "angular-progress-bar";
import {CommonTcpService} from "src/app/core/services/common.tcp.service";

@NgModule({
  declarations: [
    F2DeviceComponent,
    F2DeviceAddComponent,
    F2DeviceUpdateComponent,
    F2DeviceSearchComponent,
    F2DeviceMapComponent,
    F2DeviceDetailComponent,
    F2DeviceFilterComponent,
    F2ControlModalComponent,
    F2DeviceModalFirmwareComponent,
    F2DeviceModalCommandComponent,
    F2DeviceModalLostConnectComponent,
    F2DeviceModalHistoryDataComponent,
  ],

  imports: [
    // TransferHttpCacheModule,
    CommonModule,
    CoordinatesModule,
    NgSelectModule,
    ProgressBarModule,
    RouterModule.forChild([
      {
        path: '', component: F2DeviceComponent, children: [],
      },
      {
        path: 'map',
        component: F2DeviceMapComponent,
      },
      {
        path: 'add/:typeAdd',
        component: F2DeviceMapComponent,
      },
      {
        path: 'update/:typeUpdate/:id/:idGroup',
        component: F2DeviceMapComponent,
      },
      {
        path: 'update/:typeUpdate/:id',
        component: F2DeviceMapComponent,
      },
      {
        path: 'detail/:idGroup',
        component: F2DeviceMapComponent,
      },
      {
        path: 'detail/:idGroup/:idDevice',
        component: F2DeviceMapComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),

    InlineSVGModule,
    DropdownMenusModule,
    CKEditorModule
  ],
  entryComponents: [],
  providers: [CommonTcpService]
})
export class F2DeviceModule {
}
