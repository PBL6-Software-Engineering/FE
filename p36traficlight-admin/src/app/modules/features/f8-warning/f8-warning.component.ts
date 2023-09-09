import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {WarningService} from "src/app/core/services/features/f8-warning.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ProvinceService} from "src/app/core/services/common/c5-province.service";
import {CommonSettingService} from "src/app/core/services/features/f7-common-setting.service";

@Component({
  selector: 'app-f8-warning',
  templateUrl: './f8-warning.component.html',
  styleUrls: ['./f8-warning.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class F8WarningComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * TODO:
   * Hiển thị số lượng thông báo realtime trên cái chuông
   */
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  // condition filter
  conditionFilter: string = '';
  conditions: any[] = [];

  // status
  status: number = 0;
  isCompleted = false;

  // description
  description: string = '';

  // notes
  notes: any[] = [];

  // formWarningInfo
  formWarningInfo: FormGroup;

  // id
  id: any;

  // binding
  inputWarningInfo: any = {
    status: -1,
    notes: [
      {
        status: 0,
        description: '',
      },
      {
        status: 1,
        description: '',
      },
      {
        status: 2,
        description: '',
      },
    ],
    typeWarning: '',
  }
  /**
   * ****************** Begin for pagination ******************
   */
  pageIndex = 1;
  pageLength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [10, 20, 50, 100];


  /**
   *
   */
  onChangeSize() {
    // reset page index and load grid
    this.pageIndex = 1;
    this.onLoadDataGrid();
  }

  /**
   * onBeginClick
   */
  onBeginClick() {
    if (this.pageIndex > 1) {
      this.pageIndex = 1;
      this.onLoadDataGrid();
    }
  }

  /**
   * onPreviousClick
   */
  onPreviousClick() {
    if (this.pageIndex > 1) {
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
      this.pageIndex = lastPage;
      this.onLoadDataGrid();
    }
  }

  /**
   * ****************** End for pagination ******************
   */

    // data source for grid
  dataSources: any[] = [];
  dataSourcesTypeWarning: any[] = [];
  dataSourcesProvince: any[] = [];

  /**
   * constructor
   * @param api
   * @param commonService
   * @param formBuilder
   * @param router
   * @param cdr
   * @param el
   * @param provinceService
   * @param commonSettingService
   */
  constructor(
    private api: WarningService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
    private provinceService: ProvinceService,
    private commonSettingService: CommonSettingService,
  ) {
    this.subscription.push(
      this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res))
    );

    // add validate for controls
    this.formWarningInfo = this.formBuilder.group({
      status: [null],
      description: [null],
    });
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    // load data user
    this.onLoadDataGrid();

    // load data province
    this.onLoadDataProvince();

    // load data typeWarning
    this.onLoadDataTypeWarnings();
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
   * on Load Data Grid
   */
  onLoadDataGrid() {
    this.subscription.push(
      this.api
        .paginate({
          page: this.pageIndex,
          limit: this.pageSize,
          filter: 'sort=-createdAt' + this.conditionFilter,
          fields: '',
          populate: 'idDevice.idTypeDevice, idDevice, idDevice.idProvince, idSettingOrError'
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
        ['idDevice.name'],
        keyword
      );
      this.pageLength = this.dataSources.length;
    } else {
      this.onLoadDataGrid();
    }
  }

  /**
   * onApplyBtnClick
   */
  onApplyBtnClick(condition: any) {

    // add new condition to list
    this.addNewConditionToList({key: 'idProvince', value: condition.idProvince});
    this.addNewConditionToList({key: 'typeWarning', value: condition.typeWarning});

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
   * onLoadDataToUpdate
   * @param data
   */
  onLoadDataToUpdate(data: any) {
    this.inputWarningInfo = {
      status: data.status,
      notes: data.notes,
      typeWarning: data.typeWarning,
    }
    this.id = data._id;

    // nếu cảnh báo đã được xử lý
    if (this.inputWarningInfo.status === 2) {
      this.isCompleted = true;
    } else {
      this.isCompleted = false;
    }
    this.description = this.inputWarningInfo.notes[this.inputWarningInfo.status].description;

  }

  /**
   * onChangeSelectRadio
   * @param status
   */
  onChangeSelectRadio(status: number) {
    this.inputWarningInfo.status = status;
    this.description = this.inputWarningInfo.notes[this.inputWarningInfo.status].description;
  }

  /**
   * onUpdateBtnClick
   */
  onUpdateBtnClick() {
    // touch all control to show error
    this.formWarningInfo.markAllAsTouched();

    if (!this.formWarningInfo.invalid) {
      // show loading
      this.isLoading$.next(true);

      this.inputWarningInfo.notes[this.inputWarningInfo.status].description = this.description;
      // update
      this.subscription.push(
        this.api.update(this.id, this.inputWarningInfo).subscribe({
          next: () => {
            // hide loading
            this.isLoading$.next(false);
            this.cdr.detectChanges();

            this.commonService.showSuccess('Cập nhật thành công!');

            // close modal
            this.el.nativeElement.querySelector('#closeModal').click();

            // redirect to list
            this.onLoadDataGrid();
          },
          error: () => {
            this.commonService.showError('Cập nhật thất bại!');

            // redirect to list
            this.onLoadDataGrid();
          }
        })
      );
    }
  }

  /**
   * onLoadDataProvince
   */
  onLoadDataProvince() {
    this.provinceService.get().subscribe(data => {
      this.dataSourcesProvince = data;
    })
  }

  /**
   * onLoadDataTypeWarnings
   */
  onLoadDataTypeWarnings() {
    this.dataSourcesTypeWarning.push('Lỗi');
    this.commonSettingService.get().subscribe(data => {
      data.forEach((item: any) => {
        this.dataSourcesTypeWarning.push(item.type);
      })
    })
  }
}
