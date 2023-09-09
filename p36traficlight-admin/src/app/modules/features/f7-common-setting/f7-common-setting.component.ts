import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {CommonSettingService} from "src/app/core/services/features/f7-common-setting.service";

@Component({
  selector: 'app-f7-common-setting',
  templateUrl: './f7-common-setting.component.html',
  styleUrls: ['./f7-common-setting.component.scss'],
})
export class F7CommonSettingComponent implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  idsSelected: Map<any, boolean> = new Map();

  /**
   * ****************** Begin for pagination ******************
   */
  isSelectAll = false;
  pageIndex = 1;
  pageLength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [10, 20, 50, 100];

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
    this.isSelectAll = this.dataSources.findIndex((data: any) => !data.checked) === -1;
  }

  /**
   * getSelection
   * @returns
   */
  getSelection() {
    return this.dataSources.filter((x) => x.checked);
  }

  /**
   * onChangeSize
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
    private commonService: CommonService,
    private api: CommonSettingService
  ) {
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    // load data common settings
    this.onLoadDataGrid();
  }

  /**
   * ng After View Init
   */
  ngAfterViewInit(): void {
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
   * updateDeleteId
   * @param id
   */
  updateDeleteId(id: String) {
    this.deleteId = id;
  }

  /**
   * on Load Data Grid
   */
  onLoadDataGrid() {
    const filter = '';
    this.subscription.push(
      this.api
        .paginate(this.pageIndex, this.pageSize, filter)
        .subscribe((data) => {
          this.dataSources = data.results;
          this.pageLength = data.totalResults;

          // update status isSelectAll
          if (this.dataSources.length === 0) {
            this.isSelectAll = false;
          } else {
            // checked item when id exist in map
            if (this.idsSelected.size > 0) {
              this.dataSources.forEach((data: any) => {
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
   * onDeleteBtnClick
   */
  onDeleteBtnClick() {
    this.subscription.push(
      this.api.delete(this.deleteId).subscribe(() => {
        this.commonService.showSuccess('Xoá thành công!');
        // load new data
        this.onLoadDataGrid();
        this.isSelectAll = false;
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
        this.commonService.showSuccess('Xoá thành công!');
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
    //nếu tồn tại keyword
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
}
