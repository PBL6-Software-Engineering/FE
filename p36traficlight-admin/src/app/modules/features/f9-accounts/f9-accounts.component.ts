import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {UserService} from 'src/app/core/services/features/user.service';
import {StoreService} from 'src/app/core/services/features/store.service';
import {AuthService} from 'src/app/core/services/api/00auth.service';
import {ProvinceService} from "src/app/core/services/common/c5-province.service";

@Component({
  selector: 'app-f9-accounts',
  templateUrl: './f9-accounts.component.html',
  styleUrls: ['./f9-accounts.component.scss'],
})
export class F9AccountsComponent implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];

  // checkbox
  idsSelected: Map<any, boolean> = new Map();
  ids: any[] = [];

  /**
   * ****************** Begin for pagination ******************
   */
  isSelectAll = false;
  pageIndex = 1;
  pageLength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  // condition filter
  conditionFilter: string = '';
  conditions: any[] = [];

  // data source for grid
  dataSources: any[];
  allUsers: any[];
  provinces: any[];

  // delete id
  deleteId: String;

  // user
  user: any;

  // id User owner
  idUserOwner: any;

  // changeAcceptAccount
  changeAcceptAccount: any = {
    isActived: true
  }

  // changeLockAccount
  changeLockAccount: any = {
    isActived: false
  }

  roles: any[] = [
    'Admin1.X',
    'Admin2',
    'User',
  ]

  /**
   * constructor
   * @param commonService
   * @param api
   * @param storeService
   * @param authService
   * @param provinceService
   */
  constructor(private commonService: CommonService,
              private api: UserService,
              private storeService: StoreService,
              private authService: AuthService,
              private provinceService: ProvinceService,
  ) {
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    // load data user
    this.onLoadDataGrid();

    // load all user
    this.onLoadAllUsers();

    // load all provinces
    this.onLoadAllProvinces();

    this.idsSelected.clear();

    // get Id UserOwner
    this.getIdUserOwner();
  }

  /**
   * ng After View Init
   */
  ngAfterViewInit(): void {

    // scroll top screen
    window.scroll({left: 0, top: 0, behavior: 'smooth'});
  }

  /**
   * ngOnDestroy
   */
  ngOnDestroy() {
    this.subscription.forEach((item) => {
      item.unsubscribe();
    });
  }

  /**
   * onCheckAllSelected
   */
  onCheckAllSelected() {
    this.isSelectAll = !this.isSelectAll;

    // check or uncheck all item
    for (let i = 0; i < this.dataSources.length; i++) {
      if (this.dataSources[i].id !== this.idUserOwner) {
        this.dataSources[i].checked = this.isSelectAll;
        this.idsSelected.set(this.dataSources[i].id, this.isSelectAll);
      }
    }
  }

  /**
   *
   * @param id
   */
  onItemSelected(id: String) {

    // check or uncheck item with id
    for (let i = 0; i < this.dataSources.length; i++) {
      if (this.dataSources[i].id === id) {
        this.dataSources[i].checked = !this.dataSources[i].checked;
        this.idsSelected.set(this.dataSources[i].id, this.dataSources[i].checked);
        break;
      }
    }
    this.isSelectAll = this.dataSources.filter((data) =>
      (!data.checked && data.id !== this.idUserOwner)).length === 0;
  }

  /**
   * getSelection
   * @returns
   */
  getSelection() {
    return this.dataSources?.filter((x) => x.checked) || 0;
  }

  /**
   *
   */
  onChangeSize() {
    // uncheck select all
    this.isSelectAll = false;

    // reset page index and load grid
    this.pageIndex = 1;
    this.onLoadDataGrid();
  }

  /**
   * onBeginClick
   */
  onBeginClick() {
    if (this.pageIndex > 1) {

      // uncheck select all
      this.isSelectAll = false;

      this.pageIndex = 1;
      this.onLoadDataGrid();
    }
  }

  /**
   * onPreviousClick
   */
  onPreviousClick() {
    if (this.pageIndex > 1) {

      // uncheck select all
      this.isSelectAll = false;

      this.pageIndex -= 1;
      this.onLoadDataGrid();
    }
  }

  /**
   * onNextClick
   */
  onNextClick() {
    const lastPage = Math.ceil(this.pageLength / this.pageSize);
    if (this.pageIndex < lastPage) {

      // uncheck select all
      this.isSelectAll = false;

      this.pageIndex += 1;
      this.onLoadDataGrid();
    }
  }

  /**
   * onEndClick
   */
  onEndClick() {
    const lastPage = Math.ceil(this.pageLength / this.pageSize);

    if (this.pageIndex < lastPage) {

      // uncheck select all
      this.isSelectAll = false;

      this.pageIndex = lastPage;
      this.onLoadDataGrid();
    }
  }

  /**
   * ****************** End for pagination ******************
   */

  /**
   * add New Condition To List
   * @param condition
   */
  addNewConditionToList(condition: any) {

    // check exists
    let flg = false;
    let i;

    // check condition exists
    for (i = 0; i < this.conditions.length; i++) {
      if (this.conditions[i].key == condition.key) {
        flg = true;
        break;
      }
    }

    // remove old key
    if (flg) {
      this.conditions.splice(i, 1);
    }

    // insert new seach condition if !=0
    if (condition.value != '0') {
      this.conditions.splice(0, 0, condition);
    }

    // render new condition filter
    this.createConditionFilter();
  }

  /**
   * create Condition Filter
   */
  createConditionFilter() {
    this.conditionFilter = '';
    this.conditions.forEach((item) => {
      if (this.conditionFilter == '') {
        this.conditionFilter = item.key + '=' + item.value + '';
      } else {
        this.conditionFilter += '&' + item.key + '=' + item.value + '';
      }
    });

    if (this.conditionFilter != '') {
      this.conditionFilter = '&' + this.conditionFilter;
    }
  }

  /**
   * on Load Data Grid
   */
  onLoadDataGrid() {
    const auth = this.authService.getAuthFromLocalStorage();
    auth?.user.email != 'admin@gmail.com'
      ? (this.conditionFilter += `&idStore=${auth?.user.idStore}`)
      : this.conditionFilter;

    this.subscription.push(
      this.api
        .paginate({
          page: this.pageIndex,
          limit: this.pageSize,
          filter: this.conditionFilter + '&sort=-createdAt&deleted=false',
          populate: 'idProvince',
          fields: '',
        })
        .subscribe((data) => {
          this.dataSources = data.results;
          this.pageLength = data.totalResults;
          if (this.dataSources.length === 0) {
            this.isSelectAll = false;
          } else {

            // nếu tồn tại id trong map
            if (this.idsSelected.size > 0) {
              this.dataSources.forEach((data: any) => {

                // cập nhật trạng thái checked = true
                if (this.idsSelected.get(data._id)) {
                  data.checked = true;
                }
              })
            }
            this.isSelectAll = this.dataSources.findIndex((data: any) => !data.checked) === -1;
          }
        })
    );
  }

  /**
   * On load all customers
   */
  onLoadAllUsers() {
    this.subscription.push(
      this.api.get('populate=idProvince&deleted=false').subscribe((data: any) => {
        this.allUsers = data;
      })
    );
  }

  /**
   * On load all province
   */
  onLoadAllProvinces() {
    this.subscription.push(
      this.provinceService.get().subscribe((data: any) => {
        this.provinces = data;
      })
    );
  }

  /**
   * updateDeleteId
   * @param id
   */
  updateDeleteId(id: String) {
    this.deleteId = id;
  }

  /**
   * onDeleteBtnClick
   */
  onDeleteBtnClick() {
    this.subscription.push(
      this.api.delete(this.deleteId).subscribe(() => {
        this.commonService.showSuccess('Delete Success!');
        // load new data
        this.onLoadDataGrid();
      })
    );
  }

  /**
   * onDeleteManyBtnClick
   */
  onDeleteManyBtnClick() {

    // get list id select
    const listIdSelect = this.getSelection()
      .map((item) => item.id)
      .join(',');

    // delete many by list id select
    this.subscription.push(
      this.api.deleteManyByIds(listIdSelect).subscribe(() => {
        this.commonService.showSuccess('Delete Success!');

        // load new data
        this.onLoadDataGrid();
      })
    );
  }

  /**
   * on apply btn click
   * @param event
   */
  onApplyBtnClick(event: any) {

    const typeUserCondition = {key: 'role', value: event[0]};

    // add new condition to list
    this.addNewConditionToList(typeUserCondition);

    const provinceCondition = {key: 'idProvince', value: event[1]};

    // add new condition to list
    this.addNewConditionToList(provinceCondition);

    // load grid with new condition
    this.onLoadDataGrid();

  }

  /**
   * onSearchChange
   * @param keyword
   */
  onSearchChange(keyword: string) {

    //if keyword exists
    if (keyword != '') {
      this.dataSources = this.commonService.onSearchKeyWordReturnArray(
        this.allUsers,
        ['fullName', 'phone'],
        keyword
      );

      // nếu tồn tại id trong map
      if (this.idsSelected.size > 0) {
        this.dataSources.forEach((data: any) => {

          // cập nhật trạng thái checked = true
          if (this.idsSelected.get(data._id)) {
            data.checked = true;
          }
        })
      }
      this.isSelectAll = this.dataSources.findIndex((data: any) => !data.checked) === -1;
      this.pageLength = this.dataSources.length;
    } else {
      this.onLoadDataGrid();
    }
  }

  /**
   * onChangeAcceptAccount
   */
  onChangeAcceptAccount() {

    // get list id select
    const listIdSelect = this.getSelection()
      .map((item) => item.id)
      .join(',');

    const idCustomers = listIdSelect.split(',');
    for (let i = 0; i < idCustomers.length; i++) {
      this.subscription.push(
        this.api.update(idCustomers[i], this.changeAcceptAccount).subscribe(() => {
          this.onLoadDataGrid();
        })
      );
    }
    this.commonService.showSuccess('Xác nhận tài khoản thành công!');
  }

  /**
   * onChangeLockAccount
   */
  onChangeLockAccount() {

    // get list id select
    const listIdSelect = this.getSelection()
      .map((item) => item.id)
      .join(',');

    const idCustomers = listIdSelect.split(',');
    for (let i = 0; i < idCustomers.length; i++) {
      this.subscription.push(
        this.api.update(idCustomers[i], this.changeLockAccount).subscribe(() => {
          this.onLoadDataGrid();
        })
      );
    }
    this.commonService.showSuccess('Khóa tài khoản thành công!');
  }

  /**
   * getIdUserOwner
   */
  getIdUserOwner() {
    this.idUserOwner = this.authService.getAuthFromLocalStorage()?.user._id;
  }
}
