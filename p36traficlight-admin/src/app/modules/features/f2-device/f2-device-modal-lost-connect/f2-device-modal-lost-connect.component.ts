import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, Input, OnChanges,
  OnDestroy,
  OnInit, SimpleChanges, ViewEncapsulation,
} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {DeviceService} from 'src/app/core/services/features/f2-device.service';
import {HistoryLostConnectService} from "src/app/core/services/features/f10-history-lost-connect";

@Component({
  selector: 'app-f2-device-modal-lost-connect',
  templateUrl: './f2-device-modal-lost-connect.component.html',
  styleUrls: ['./f2-device-modal-lost-connect.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class F2DeviceModalLostConnectComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  @Input() device: any;

  dataSources: any[] = [];

  /**
   * ****************** Begin for pagination ******************
   */
  pageIndex = 1;
  pageLength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  /**
   * onChangeSize
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

  /**
   * constructor
   * @param api
   * @param apiHistoryLostConnect
   * @param common
   * @param router
   * @param cdr
   */
  constructor(
    private api: DeviceService,
    private apiHistoryLostConnect: HistoryLostConnectService,
    private common: CommonService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.subscription.push(
      this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res))
    );

  }

  /**
   * ng On Init
   */
  ngOnInit(): void {
    this.onLoadDataGrid();
  }

  /**
   * ng After View Init
   */
  ngAfterViewInit(): void {
    // scroll top screen
    window.scroll({left: 0, top: 0, behavior: 'smooth'});
  }

  /**
   * ng On Destroy
   */
  ngOnDestroy() {
    this.subscription.forEach((item) => {
      item.unsubscribe();
    });
  }

  /**
   * onLoadDataGrid
   */
  onLoadDataGrid() {
    if (this.device) {
      this.subscription.push(
        this.apiHistoryLostConnect.paginate(this.pageIndex, this.pageSize, '&idDevice=' + this.device._id)
          .subscribe(data => {
            this.dataSources = data.results;
            this.pageLength = data.totalResults;
          })
      );
    }
  }

  /**
   * ngOnChanges
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.device) {
      if(this.device.numberLostConnect === 0) {
        this.dataSources = [];
      } else {
        this.onLoadDataGrid();
      }
    }
  }
}
