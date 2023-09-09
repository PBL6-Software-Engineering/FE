import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { DeviceErrorService } from 'src/app/core/services/features/f6-device-error.service';

@Component({
  selector: 'app-f5-firmware',
  templateUrl: './f6-device-error.component.html',
  styleUrls: ['./f6-device-error.component.scss'],
})
export class F6DeviceErrorComponent implements OnInit, OnDestroy {

  // subscription
  subscription: Subscription[] = [];
  observable: Observable<any>;
  observer: Observer<any>;

  // map idsSelected
  idsSelected: Map<any, boolean> = new Map();

  /**
   * ****************** Begin for pagination ******************
   */
  isSelectAll = false;
  pageIndex = 1;
  pageLength = 0;
  pageSize = 5;
  conditionFilter = '';
  pageSizeOptions: number[] = [10, 20, 50, 100];
  url = './assets/media/svg/files/delete.svg';

  // data source for grid
  dataSources: any[] = [];

  // delete id
  deleteId: String;

  /**
   * constructor
   * @param commonService
   * @param api
   */
  constructor(
    public commonService: CommonService,
    private api: DeviceErrorService,
  ) {
    // xử lý bất đồng bộ
    this.observable = Observable.create((observer: any) => {
      this.observer = observer;
    });
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    // load data
    this.onLoadDataGrid();
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
   *onLoadDataGrid
   */
  onLoadDataGrid() {
    this.subscription.push(
      this.api
        .paginate({
          page: this.pageIndex,
          limit: this.pageSize,
          filter: this.conditionFilter + '&sort=-createdAt',
          fields: '',
          populate: '',
        })
        .subscribe((data) => {
          this.dataSources = data.results;
          this.pageLength = data.totalResults;

          // update status isSelectAll
          if (this.dataSources.length === 0) {
            this.isSelectAll = false;
          } else {

            // checked item when id exist in map
            if(this.idsSelected.size > 0) {
              this.dataSources.forEach((data: any) => {
                if(this.idsSelected.get(data._id)) {
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
   * getSelection
   * @returns
   */
  getSelection() {
    return this.dataSources.filter((x) => x.checked);
  }

  /**
   * onCheckAllSelected
   */
  onCheckAllSelected() {
    this.isSelectAll = !this.isSelectAll;

    // check or uncheck all item
    for (let i = 0; i < this.dataSources.length; i++) {
      this.dataSources[i].checked = this.isSelectAll;
      this.idsSelected.set(this.dataSources[i].id, this.isSelectAll);
    }
  }

  /**
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
    this.isSelectAll = this.dataSources.findIndex((data: any) => !data.checked) === -1;
  }

  /**
   *onChangeSize
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
        this.commonService.showSuccess('Xóa thành công!');

        // load new data
        this.onLoadDataGrid();
        this.isSelectAll = false;
      })
    );
  }

  /**
   * onDeleteManyBtnClick
   */
  onBtnDeleteManyClick() {
    // get list id select
    const listIdSelect = this.getSelection()
      .map((item) => item.id)
      .join(',');

    // delete many by list id select
    this.subscription.push(
      this.api.deleteManyByIds(listIdSelect).subscribe(() => {
        this.commonService.showSuccess('Xóa thành công!');

        // load new data
        this.onLoadDataGrid();
        this.isSelectAll = false;
      })
    );
  }

  /**
   * onSearchChange
   * @param keyword
   */
  onSearchChange(keyword: string) {
    // if keyword exists
    if (keyword != '') {
      this.dataSources = this.commonService.onSearchKeyWordReturnArray(
        this.dataSources,
        ['name'],
        keyword
      );
      if (this.dataSources.length === 0) {
        this.isSelectAll = false;
      } else {
        this.isSelectAll = this.dataSources.findIndex((data: any) => !data.checked) === -1;
      }

      this.pageLength = this.dataSources.length;
    } else {
      this.onLoadDataGrid();
    }
  }

  /**
   * onApplyBtnClick
   * @param event
   */
  onApplyBtnClick(event: any) {
    let query = '';

    // chạy vòng lặp tìm giá trị id và value
    for (const [key, value] of Object.entries(event)) {

      // nếu giá trị value khác 0 thì lọc
      if (value !== '0') query += `&${key}=${value}`;
    }
    this.conditionFilter = query;
    this.onLoadDataGrid();
  }
}
