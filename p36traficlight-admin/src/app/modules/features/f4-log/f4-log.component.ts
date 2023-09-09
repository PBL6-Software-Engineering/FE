import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {LogService} from "src/app/core/services/features/f4-log.service";

@Component({
  selector: 'app-f4-log',
  templateUrl: './f4-log.component.html',
  styleUrls: ['./f4-log.component.scss'],
})
export class F4LogComponent implements OnInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];

  /**
   * ****************** Begin for pagination ******************
   */
  isSelectAll = false;
  pageIndex = 1;
  pageLength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  // filer
  conditionFilter: string = '';

  /**
   * onCheckAllSelected
   */
  onCheckAllSelected() {
    this.isSelectAll = !this.isSelectAll;

    // check or uncheck all item
    for (let i = 0; i < this.dataSources.length; i++) {
      this.dataSources[i].checked = this.isSelectAll;
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
        break;
      }
    }
  }

  /**
   * getSelection
   * @returns
   */
  getSelection() {
    return this.dataSources.filter((x) => x.checked);
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

  // data source for grid
  dataSources: any[] = [];

  /**
   * constructor
   * @param api
   * @param commonService
   */
  constructor(
    private commonService: CommonService,
    private api: LogService
  ) {
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    this.conditionFilter = `&filter={"accessTime": {"$gte": ${startDate.getTime()},
                            "$lte": ${endDate.getTime()}}}`;

    // load data log
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
   * on Load Data Grid
   */
  onLoadDataGrid() {
    this.subscription.push(
      this.api
        .paginate({
          page: this.pageIndex,
          limit: this.pageSize,
          filter: this.conditionFilter,
          fields: '',
          populate: 'idUser',
        })
        .subscribe((data) => {
          this.dataSources = data.results;
          this.pageLength = data.totalResults;
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
        ['idUser.fullName'],
        keyword
      );
      this.pageLength = this.dataSources.length;
    } else {
      this.onLoadDataGrid();
    }
  }

  /**
   * getColor
   * @param action
   */
  getColor(action: string) {
    action = action.toLowerCase();
    switch (action) {
      case 'create':
        return {'color': '#0095E9', 'background-color': 'rgba(0, 149, 233, 0.2)'};
      case 'update':
        return {'color': '#30BB1A', 'background-color': 'rgba(48, 187, 26, 0.3)'};
      case 'delete':
        return {'color': '#EB0F0F', 'background-color': 'rgba(235, 15, 15, 0.3)'};
      default:
        return {'color': '#0095E9', 'background-color': 'rgba(0, 149, 233, 0.2)'};
    }
  }

  /**
   * onOneDateClick
   * @param event
   */
  onOneDateClick(event: any) {
    const date = event;
    const startDate = new Date(date).setHours(0, 0, 0, 0);
    const endDate = new Date(date).setHours(23, 59, 59, 999);
    this.conditionFilter = '';
    let filter = '';

    // nếu tồn tại date
    if (date !== '') {
      filter = filter.concat(`&filter={"accessTime": {"$gte": ${new Date(startDate).getTime()},
                              "$lte": ${new Date(endDate).getTime()}}}`);
    }
    this.conditionFilter = filter;

    this.onLoadDataGrid();
  }

  /**
   * onMultiDateClick
   * @param event
   */
  onMultiDateClick(event: any) {
    const multiDate = event;
    this.conditionFilter = '';
    let filter = '';

    // nếu tồn tại multiDate
    if (multiDate !== '') {
      const firstDate = new Date(multiDate.split('-')[0]).getTime();
      const secondDate = new Date(multiDate.split('-')[1]).getTime();
      filter = filter.concat(`&filter={"accessTime": {"$gte": ${firstDate},"$lte": ${secondDate}}}`);
    }
    this.conditionFilter = filter;
    this.onLoadDataGrid();
  }
}
