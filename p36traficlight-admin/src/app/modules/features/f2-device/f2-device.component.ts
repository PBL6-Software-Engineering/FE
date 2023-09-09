import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {DeviceService} from "src/app/core/services/features/f2-device.service";
import {ProvinceService} from "src/app/core/services/common/c5-province.service";
import {TypeDeviceService} from "src/app/core/services/features/f1-type-device.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Router} from "@angular/router";

/**
 * Todo List:
 * - Filter by authorization of user
 */
@Component({
  selector: 'app-f2-device',
  templateUrl: './f2-device.component.html',
  styleUrls: ['./f2-device.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class F2DeviceComponent implements OnInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  // subscription listener firebase
  subscriptionFirebase: Subscription[] = [];

  /**
   * ****************** Begin for pagination ******************
   */
  isSelectAll = false;
  idsSelected: Map<any, boolean> = new Map();
  pageIndex = 1;
  pageLength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  // condition filter
  conditionFilter: string = '';
  conditions: any[] = [];

  // interval
  intervals: Map<any, any> = new Map<any, any>();
  // using demo time hard setting
  statusDevices: Map<number, number> = new Map<number, number>();

  // object change status
  changeStatus = {
    id: '',
    isLock: true
  };

  /**
   * onCheckAllSelected
   */
  onCheckAllSelected() {
    this.isSelectAll = !this.isSelectAll;
    // check or uncheck all items
    this.dataSources.forEach(group => {
      group.checked = this.isSelectAll;
      this.idsSelected.set(group._id, this.isSelectAll);
      group.childs.forEach((c: any) => {
        this.idsSelected.set(c._id, this.isSelectAll);
        c.checked = this.isSelectAll;
      });
    })
  }

  /**
   * onItemSelected
   * @param id
   */
  onItemSelected(id: string) {
    for (let i = 0; i < this.dataSources.length; i++) {
      const group = this.dataSources[i];
      // check or uncheck group
      if (group.id === id) {
        group.checked = !group.checked;
        this.idsSelected.set(group._id, group.checked);
        group.childs.forEach((c: any) => {
          c.checked = group.checked;
          this.idsSelected.set(c._id, c.checked);
        });
        break;
      }
      // check or uncheck child of group
      const index = group.childs.findIndex((c: any) => c._id === id);
      if (index !== -1) {
        group.childs[index].checked = !group.childs[index].checked;
        this.idsSelected.set(id, group.childs[index].checked);
        break;
      }
    }
    this.isEnableUpgrade();
    this.isSelectAll = this.dataSources.findIndex(t => !t.checked) === -1;
  }

  /**
   * getListIdSelect
   * @returns
   */
  getListIdSelect() {
    const ids: string[] = [];
    this.dataSources.forEach(group => {
      if (group.checked) {
        ids.push(group._id);
      }
      group.childs.forEach((device: any) => {
        if (device.checked) {
          ids.push(device._id);
        }
      })
    })
    return ids;
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
  dataSourcesProvince: any[] = [];
  dataSourcesTypeDevice: any[] = [];
  dataSourcesAllGroup: any[] = [];

  // delete id
  deleteId: String;
  idUpgrade: string = '';

  deviceSelected: any;

  /**
   * constructor
   * @param api
   * @param apiProvince
   * @param apiTypeDevice
   * @param commonService
   * @param firebase
   * @param router
   */
  constructor(
    private api: DeviceService,
    private apiProvince: ProvinceService,
    private apiTypeDevice: TypeDeviceService,
    private commonService: CommonService,
    private firebase: AngularFireDatabase,
    private router: Router,
  ) {

  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.idsSelected = new Map();
    this.onLoadDataGrid();
    this.onLoadAllGroup();
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
        .paginate(this.pageIndex, this.pageSize, this.conditionFilter)
        .subscribe((data) => {
          this.clearGetOldRealtime();
          this.dataSources = data.results;
          this.pageLength = data.totalResults;
          // get realtime
          this.getRealtimeDatasource();
          // update checked datasource
          this.updateCheckedDataSources();
          // load reference
          this.loadDataReference();
        })
    );
  }

  /**
   * getRealtimeDatasource
   */
  getRealtimeDatasource() {
    for (let i = 0; i < this.dataSources.length; i++) {
      this.subscriptionFirebase.push(
        this.firebase.object(`devices/${this.dataSources[i].deviceCode}`).valueChanges()
          .subscribe((item: any) => {
            if (item && item.data) {
              this.dataSources[i].childs.forEach((c: any) => {
                const index = c.position - 1;
                const status = item.data[index];
                if (this.statusDevices.get(index)) {
                  if (this.statusDevices.get(index) === status) {
                    return;
                  } else {
                    this.statusDevices.set(index, status);
                  }
                } else {
                  this.statusDevices.set(index, status);
                }
                c.status = status;
                // 1: xanh, 2: vàng, 3: đỏ, 0: tắt
                if (status === 1 || status === 3) {
                  c.time = 30;
                } else if (status === 2) {
                  c.time = 3;
                } else if (status === 0) {
                  c.time = undefined;
                }
                // set run time
                clearInterval(this.intervals.get(index));
                const interval = setInterval(() => {
                  c.time--;
                  if (c.time === 0) {
                    c.status = undefined;
                    clearInterval(this.intervals.get(index));
                    return;
                  }
                }, 1000);
                this.intervals.set(index, interval);
              });
            }
          })
      )
    }
  }

  /**
   * clearGetOldRealtime
   */
  clearGetOldRealtime() {
    this.subscriptionFirebase.forEach(sub => sub.unsubscribe());
    this.subscriptionFirebase = [];
    this.statusDevices = new Map<number, number>();
    this.intervals.forEach(interval => {
      clearInterval(interval);
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
   * onDeleteBtnClick
   */
  onDeleteBtnClick() {
    const group = this.dataSources.find(item => item._id === this.deleteId);
    // if delete group => delete device in group
    if (group) {
      group.checked = true;
      const ids = [];
      ids.push(group._id);
      group.childs.forEach((c: any) => {
        ids.push(c._id);
        c.checked = true;
      });
      this.api.deleteManyByIds(ids).subscribe(() => {
        this.commonService.showSuccess('Xoá thành công!');
        this.onLoadDataGrid();
        this.onLoadAllGroup();
      });
    } else {
      // delete device in group
      for (let i = 0; i < this.dataSources.length; i++) {
        const group = this.dataSources[i];
        const isDeleted = group.childs.findIndex((c: any) => c._id === this.deleteId) !== -1;
        if (isDeleted) {
          this.api.deleteDeviceInGroup(group._id, this.deleteId).subscribe(() => {
            this.commonService.showSuccess('Xoá thành công!');
            this.onLoadDataGrid();
            this.onLoadAllGroup();
          });
          return;
        }
      }
    }
  }

  /**
   * onDeleteManyBtnClick
   */
  onDeleteManyBtnClick() {
    // get list id select
    const listIdSelect = this.getListIdSelect();
    // delete many by list id select
    this.subscription.push(
      this.api.deleteManyByIds(listIdSelect).subscribe(() => {
        this.commonService.showSuccess('Xoá thành công!');
        // update child group
        this.updateChildGroup();
        // load new data
        this.onLoadDataGrid();
        this.onLoadAllGroup();
      })
    );
    this.isSelectAll = false;
  }

  /**
   * deleteDeviceInGroup
   */
  updateChildGroup(): void {
    let idsGroup = '';
    let idsDevice = '';

    // find group not delete
    const groups = this.dataSources.filter(g => !g.checked);
    groups.forEach((g: any) => {
      // find device delete
      let devicesChecked = g.childs.filter((c: any) => c.checked);
      let idsDeviceDelete = devicesChecked.map((d: any) => d._id);
      if (idsDeviceDelete.length > 0) {
        idsGroup += g._id + ',';
        idsDevice += idsDeviceDelete.join(',');
        idsDevice += ';';
      }
    })
    idsGroup = idsGroup.slice(0, idsGroup.length - 1);
    idsDevice = idsDevice.slice(0, idsDevice.length - 1);
    this.api.updateChildGroup(idsGroup, idsDevice).subscribe();
  }

  /**
   * onSearchChange
   * @param keyword
   */
  onSearchChange(keyword: string) {
    //nếu tồn tại keyword
    if (keyword !== '') {
      this.clearGetOldRealtime();
      this.dataSources = this.dataSourcesAllGroup.filter(
        (group: any) => {
          // search group
          if (this.commonService.cleanAccents(group?.name)?.toLowerCase()
            .indexOf(this.commonService.cleanAccents(keyword).toLowerCase()) !== -1) {
            return true;
          }
          // search child of group
          for (let i = 0; i < group.childs.length; i++) {
            if (this.commonService.cleanAccents(group.childs[i]?.name)?.toLowerCase()
              .indexOf(this.commonService.cleanAccents(keyword).toLowerCase()) !== -1) {
              return true;
            }
          }
        }
      );
      this.pageLength = this.dataSources.length;
      this.updateCheckedDataSources();
    } else {
      this.onLoadDataGrid();
    }
  }

  /**
   * load Data Reference
   */
  loadDataReference() {
    if (this.dataSourcesTypeDevice.length === 0 || this.dataSourcesProvince.length === 0) {
      this.subscription.push(
        this.apiProvince.get().subscribe((data) => {
          this.dataSourcesProvince = data;
        })
      );
      this.subscription.push(
        this.apiTypeDevice.get().subscribe((data) => {
          this.dataSourcesTypeDevice = data;
        })
      )
    }
  }

  /**
   * onLoadAllGroup
   */
  onLoadAllGroup() {
    this.subscription.push(this.api.findByGroup().subscribe(data => this.dataSourcesAllGroup = data));
  }

  /**
   * onApplyBtnClick
   */
  onApplyBtnClick(condition: any) {
    // add new condition to list
    this.addNewConditionToList({key: 'idProvince', value: condition.idProvince});
    this.addNewConditionToList({key: 'idTypeDevice', value: condition.idTypeDevice});
    // load grid with new condition
    this.onLoadDataGrid();
  }

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

    // insert new search condition if != 0
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
   * onResetFilter
   */
  onResetFilter() {
    if (this.conditionFilter !== '') {
      this.conditionFilter = '';
      this.onLoadDataGrid();
    }
  }

  /**
   * isEnableUpgrade
   */
  isEnableUpgrade() {
    let count = 0;
    let isLock = true;
    let idUpgrade = '';
    for (let i = 0; i < this.dataSources.length; i++) {
      if (this.dataSources[i].checked) {
        idUpgrade = this.dataSources[i]._id;
        isLock = isLock && this.dataSources[i].isLock;
        count++;
        if (count === 2) {
          this.idUpgrade = '';
          return false;
        }
      }
    }
    this.idUpgrade = count === 1 && !isLock ? idUpgrade : '';
    return count === 1 && !isLock;
  }

  /**
   * changeStatusLock
   * @param id
   * @param isLock
   */
  updateStatusLock(id: any, isLock: boolean) {
    this.changeStatus = {id, isLock};
  }

  /**
   * onChangeStatusLock
   */
  onChangeStatusLock() {
    this.api.changeStatusLock(this.changeStatus.id, this.changeStatus.isLock).subscribe(() => {
      this.commonService.showSuccess(this.changeStatus.isLock ? 'Khoá thành công!' : 'Mở khoá thành công!');
      const group = this.dataSources.find(d => d._id === this.changeStatus.id);
      if (group) {
        group.isLock = this.changeStatus.isLock;
      }
    })
  }

  /**
   * updateIdSelected
   * @param id
   */
  updateIdSelected(id: any) {
    this.deviceSelected = this.dataSources.find(t => t._id === id);
  }

  /**
   * updateCheckedDataSources
   */
  updateCheckedDataSources() {
    if (this.dataSources.length === 0) {
      this.isSelectAll = false;
    } else {
      // checked item when id exist in map
      if (this.idsSelected.size > 0) {
        this.dataSources.forEach((data: any) => {
          if (this.idsSelected.get(data._id)) {
            data.checked = true;
          }
          data.childs.forEach((c: any) => {
            if (this.idsSelected.get(c._id)) {
              c.checked = true;
            }
          });
        })
      }
      this.isSelectAll = this.dataSources.findIndex((data: any) => !data.checked) === -1;
    }
  }

  forwardConfiguration(id: any) {
    window.localStorage.setItem('previousUrl', '/features/devices');
    this.router.navigateByUrl(`/features/configurations/${id}`);
  }
}
