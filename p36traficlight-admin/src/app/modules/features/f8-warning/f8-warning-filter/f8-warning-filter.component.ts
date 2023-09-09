import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-f8-warning-filter',
  templateUrl: './f8-warning-filter.component.html',
  styleUrls: ['./f8-warning-filter.component.scss'],
})
export class F8WarningFilterComponent {
  // define host binding
  @HostBinding('class') class = 'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  // input data source for select
  @Input() typeWarnings: any[] = [];
  @Input() provinces: any[] = [];

  // output
  @Output() applyBtnClick = new EventEmitter<object>();
  @Output() resetFilter = new EventEmitter<any>();

  // binding
  typeWarningSelect: string = '0';
  provinceSelect: string = '0';

  /**
   * constructor
   */
  constructor() { }

  /**
   * onApplyBtnClick
   */
  onApplyBtnClick() {
    this.applyBtnClick.emit({
      'typeWarning': this.typeWarningSelect,
      'idProvince': this.provinceSelect
    });
  }

  /**
   * onResetFilter
   */
  onResetFilter() {
    this.typeWarningSelect = '0';
    this.provinceSelect = '0';
    this.resetFilter.emit();
  }
}
