import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/api/00auth.service';

@Component({
  selector: 'f9-accounts-filter',
  templateUrl: './f9-accounts-filter.component.html',
})
export class F9AccountsFilterComponent implements OnInit {
  // define host binding
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  // input data source for select
  @Input() typeUsers: any[] = [];
  @Input() provinces: any[] = [];

  // output
  @Output() applyBtnClick = new EventEmitter<any>();

  // binding
  provinceSelect: string = '0';
  typeUserSelect: string = '0';

  /**
   * constructor
   * @param authService
   */
  constructor(
    private authService: AuthService
  ) { }

  /**
   *
   */
  ngOnInit(): void { }

  /**
   * onApplyBtnClick
   */
  onApplyBtnClick() {
    const param = [this.typeUserSelect, this.provinceSelect];
    this.applyBtnClick.emit(param);
  }

  /**
   * onResetFilterClick
   */
  onResetFilterClick() {
    const param = [
      this.typeUserSelect = '0',
      this.provinceSelect = '0',
    ]
    this.applyBtnClick.emit(param);
  }

  /**
   * getEmailAuth
   * @returns
   */
  getEmailAuth() {
    const emailAuth = this.authService.getAuthFromLocalStorage();
    return emailAuth?.user.email
  }
}
