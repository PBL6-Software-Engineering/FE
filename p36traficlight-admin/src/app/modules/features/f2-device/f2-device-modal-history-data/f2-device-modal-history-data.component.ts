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
import {HistoryDataService} from "src/app/core/services/features/f11-history-data.service";

@Component({
  selector: 'app-f2-device-modal-history-data',
  templateUrl: './f2-device-modal-history-data.component.html',
  styleUrls: ['./f2-device-modal-history-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class F2DeviceModalHistoryDataComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  @Input() device: any;

  data: any;

  /**
   * constructor
   * @param api
   * @param common
   * @param router
   * @param cdr
   * @param historyDataService
   */
  constructor(
    private api: DeviceService,
    private common: CommonService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private historyDataService: HistoryDataService,
  ) {
    this.subscription.push(
      this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res))
    );
  }

  /**
   * ng On Init
   */
  ngOnInit(): void {
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
    if(this.device) {
      this.isLoading$.next(true);
      this.subscription.push(
        this.historyDataService.findByIdDevice(this.device._id).subscribe(data => {
          this.data = data;
          this.isLoading$.next(false);
        })
      );
    }
  }

  /**
   * ngOnChanges
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.onLoadDataGrid();
  }
}
