import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {DeviceService} from 'src/app/core/services/features/f2-device.service';
import {CommonTcpService} from "src/app/core/services/common.tcp.service";

@Component({
  selector: 'app-f2-control-modal',
  templateUrl: './f2-control-modal.component.html',
  styleUrls: ['./f2-control-modal.component.scss'],
})
export class F2ControlModalComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];

  // subscription firebase
  subscriptionFirebase: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  isLoadOnInit: boolean = false;

  // isControlByHand
  isControlByHand = false;

  // binding data0
  data0 = '1';

  dataDecimals: number[] = [];
  length: number = 1;
  dataByHand: string[] = [];

  @Input() group: any;

  /**
   * constructor
   * @param api
   * @param common
   * @param router
   * @param cdr
   * @param formBuilder
   * @param el
   * @param commonTcp
   */
  constructor(
    private api: DeviceService,
    private common: CommonService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private commonTcp: CommonTcpService,
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
   * onSelectControlByHand
   */
  onSelectControlByHand() {
    this.isControlByHand = true;
    this.group?.childs.forEach((item: any) => {
      this.dataByHand[item.position - 1] = '1, 0, 0, 0';
    })
  }

  /**
   * onSelectControlNotByHand
   */
  onSelectControlNotByHand() {
    this.isControlByHand = false;
  }

  /**
   * onSubmitData
   */
  onSubmitData() {
    // nếu không có port
    if(+this.group.port < 0) {
      if (this.group.ip === '') {
        this.common.showError('Chưa thiết lập ip và port thiết bị');
      } else {
        this.common.showError('Chưa thiết lập ip thiết bị');
      }
      this.isLoading$.next(false);
    } else if(this.group.ip === '') {
      this.common.showError('Chưa thiết lập ip thiết bị');
      this.isLoading$.next(false);
    } else {
      this.dataDecimals = [+this.group.deviceCode, 7, this.length, +this.data0];

      // nếu chọn cấu hình bằng tay
      if (this.isControlByHand) {
        const dataByHandStrings = JSON.parse("[" + this.dataByHand.join(', ') + "]");

        const dataByHandNumbers = dataByHandStrings.map((item: any) => Number(item));

        this.dataDecimals[2] = this.length + dataByHandNumbers.length;
        this.dataDecimals = this.dataDecimals.concat(dataByHandNumbers);
      }
      let checkSum = 0;
      checkSum = this.commonTcp.calculateChecksum(this.dataDecimals);
      this.dataDecimals.push(checkSum);

      // show loading
      this.isLoading$.next(true);

      this.subscription.push(
        this.api.sendAndReceiveData({
          port: +this.group.port,
          host: this.group.ip,
          data: this.dataDecimals
        }).subscribe({
          next: () => {
            this.isLoading$.next(false);
            this.cdr.detectChanges();
            this.common.showSuccess('Sửa thành công!');

            this.el.nativeElement.querySelector('.close-modal').click();
          },
          error: () => {
            this.common.showError('Sửa thất bại');
            this.isLoading$.next(false);
            this.el.nativeElement.querySelector('.close-modal').click();
          }
        })
      )
    }
  }
}
