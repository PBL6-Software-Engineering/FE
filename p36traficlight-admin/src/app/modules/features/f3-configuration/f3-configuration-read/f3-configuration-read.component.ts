import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {ConfigurationService} from 'src/app/core/services/features/f3-configuration.service';
import {DeviceService} from "../../../../core/services/features/f2-device.service";
import {finalize} from "rxjs/operators";
import {CommonTcpService} from "../../../../core/services/common.tcp.service";

@Component({
  selector: 'app-f3-configuration-read',
  templateUrl: './f3-configuration-read.component.html',
  styleUrls: ['./f3-configuration-read.component.scss'],
})
export class F3ConfigurationReadComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  isLoadingStore$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingStore: boolean;

  idDevice: any;
  device: any;
  dataSources: any[] = [];

  isError = false;
  messageError = '';

  /**
   * Constructor
   * @param api
   * @param apiDevice
   * @param common
   * @param commonTcp
   * @param router
   * @param cdr
   * @param route
   */
  constructor(
    private api: ConfigurationService,
    private apiDevice: DeviceService,
    public common: CommonService,
    private commonTcp: CommonTcpService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.subscription.push(
      this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res)),
      this.isLoadingStore$.asObservable().subscribe((res) => (this.isLoadingStore = res))
    );

  }

  /**
   * ng On Init
   */
  ngOnInit(): void {
    if(this.route.parent) {
      this.route.parent.params.subscribe((params: any) => {
        this.idDevice = params.idDevice;
        this.isLoading$.next(true);
        this.subscription.push(
          this.apiDevice.find(this.idDevice).subscribe(device => {
            this.device = device;
            if(device.port < 0) {
              this.isError = true;
              this.messageError = device.ip === '' ? 'Chưa thiết lập ip và port thiết bị!'
                : 'Chưa thiết lập port thiết bị!';
              this.isLoading$.next(false);
            } else if(device.ip === '') {
              this.isError = true;
              this.messageError = 'Chưa thiết lập ip thiết bị!';
              this.isLoading$.next(false);
            } else {
              // create array bytes for send to device
              const bytes = [+device.deviceCode, 3, 1, 0, +device.deviceCode + 4];
              // calculate checksum
              bytes.push(this.commonTcp.calculateChecksum(bytes));
              this.apiDevice.sendAndReceiveData({
                host: device.ip,
                port: device.port,
                data: bytes
              }).pipe(finalize(() => {
                this.isLoading$.next(false);
              })).subscribe({
                next: (data: any) => {
                  const decimals = this.commonTcp.convertHexToDec(data.result);
                  if(this.commonTcp.isValidChecksum(decimals)) {
                    // create datasource after receive data from device
                    for(let i = 2; i < decimals.length; i++) {
                      this.dataSources.push({
                        position: i - 1,
                        parameter: '',
                        byte: 1,
                        value: decimals[i],
                        idDevice: this.idDevice
                      })
                    }
                  } else {
                    this.isError = true;
                    this.messageError = 'Dữ liệu nhận về không hợp lệ!';
                  }
                },
                error: (error: any) => {
                  this.isError = true;
                  this.messageError = error.error.errors[0].detail;
                }
              })
            }
          })
        )
      });
    }
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
   * storeDatabase
   */
  storeDatabase() {
    this.isLoadingStore$.next(true);
    // upsert dataSources to database
    this.api.deleteAndInsertMany(this.dataSources).subscribe(data => {
      this.dataSources = data;
      this.isLoadingStore$.next(false);
      this.common.showSuccess('Cập nhật thành công!');
    })
  }
}
