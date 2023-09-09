import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef, Input, OnChanges,
  OnDestroy,
  OnInit, SimpleChanges, ViewEncapsulation,
} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {F5FirmwareService} from "src/app/core/services/features/f5-firmware.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-f2-device-modal-firmware',
  templateUrl: './f2-device-modal-firmware.component.html',
  styleUrls: ['./f2-device-modal-firmware.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class F2DeviceModalFirmwareComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @Input() idUpgrade = '';

  isChangeModel = true;
  progress = 2;
  intervalProgress: any;

  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  dataAllFirmwares: any[] = [];
  dataSources: any[] = [];

  // binding
  keyword: string = '';
  lastKeyword: string = '';
  searching: boolean = false;

  idSelected: '';

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
   * @param common
   * @param router
   * @param cdr
   * @param el
   * @param http
   * @param commonService
   */
  constructor(
    private api: F5FirmwareService,
    private common: CommonService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
    private http: HttpClient,
    private commonService: CommonService
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
   * on Load Data Grid
   */
  onLoadDataGrid() {
    this.subscription.push(
      this.api.paginate({
        page: this.pageIndex,
        limit: this.pageSize,
        filter: '',
        fields: '',
        populate: '',
      })
        .subscribe((data) => {
          this.dataSources = data.results;
          this.pageLength = data.totalResults;
        })
    );
    this.subscription.push(this.api.get().subscribe(data => {
      this.dataAllFirmwares = data;
    }));
  }

  /**
   * search
   * @param keyword
   */
  search(keyword: string) {
    this.keyword = keyword;
    this.searching = true;

    setTimeout(() => {
      this.searching = false;
      this.cdr.detectChanges();

      // call api one second one time
      if (this.lastKeyword != this.keyword) {
        this.lastKeyword = this.keyword;
        this.dataSources = this.dataAllFirmwares.filter((firmware) => {
          if (this.commonService.cleanAccents(firmware?.nameModel)?.toLowerCase()
            .indexOf(this.commonService.cleanAccents(this.keyword).toLowerCase()) !== -1) {
            return true;
          }
        })
        this.pageLength = this.dataSources.length;
      }
    }, 1000);
  }

  /**
   * clearSearch
   */
  clearSearch() {
    this.keyword = '';
    this.lastKeyword = '';
    this.dataSources = this.dataAllFirmwares.filter((firmware) => {
      if (this.commonService.cleanAccents(firmware?.nameModel)?.toLowerCase().indexOf('') !== -1) {
        return true;
      }
    })
    this.pageLength = this.dataSources.length;
  }

  /**
   * updateIdSelect
   * @param id
   */
  updateIdSelect(id: any) {
    this.isChangeModel = this.idSelected !== id;
    this.idSelected = id;
  }

  /**
   * resetIdSelected
   */
  resetIdSelected() {
    this.idSelected = '';
  }

  /**
   * ngOnChanges
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.idSelected = '';
  }

  /**
   * processUpgrade
   */
  processUpgrade() {
    const count = 2;
    this.progress = 0;
    this.el.nativeElement.querySelector('.modal-custom').style.display = 'block';
    if (this.el.nativeElement.querySelector('.text-progress')) {
      this.el.nativeElement.querySelector('.text-progress').style.left = 10 + 'px';
    }

    clearInterval(this.intervalProgress);
    this.intervalProgress = setInterval(() => {
      this.progress += count;
      if (this.progress > 12) {
        const left = this.el.nativeElement.querySelector('#progress-bar').offsetWidth * (this.progress - 12) / 100;
        this.el.nativeElement.querySelector('.text-progress').style.left = left + 'px';
      }
      if (this.progress === 92) {
        clearInterval(this.intervalProgress);
      }
    }, 200);
    this.http.get('http://localhost:4036/v1/devices/testSendFirmware').subscribe(next => {
      this.progress = 100;
      const left = this.el.nativeElement.querySelector('#progress-bar').offsetWidth * 88 / 100;
      this.el.nativeElement.querySelector('.text-progress').style.left = left + 'px';
      clearInterval(this.intervalProgress);
    })
  }

  /**
   * closedModalProcessUpgrade
   */
  closedModalProcessUpgrade() {
    this.el.nativeElement.querySelector('.modal-custom').style.display = 'none';
  }
}
