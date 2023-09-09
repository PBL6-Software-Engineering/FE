import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';

@Component({
  selector: 'f2-device-filter',
  templateUrl: './f2-device-filter.component.html',
  styleUrls: ['./f2-device-filter.component.scss'],
})
export class F2DeviceFilterComponent {
  // define host binding
  @HostBinding('class') class = 'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  // input data source for select
  @Input() typeDevices: any[] = [];
  @Input() provinces: any[] = [];

  // output
  @Output() applyBtnClick = new EventEmitter<object>();
  @Output() resetFilter = new EventEmitter<any>();

  // binding
  typeDeviceSelect: string = '0';
  provinceSelect: string = '0';

  /**
   * constructor
   */
  constructor() {
  }

  /**
   * onApplyBtnClick
   */
  onApplyBtnClick() {
    this.applyBtnClick.emit({
      'idTypeDevice': this.typeDeviceSelect,
      'idProvince': this.provinceSelect
    });
  }

  onResetFilter() {
    this.typeDeviceSelect = '0';
    this.provinceSelect = '0';
    this.resetFilter.emit();
  }
}
