import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {DeviceService} from 'src/app/core/services/features/f2-device.service';
import {ConfigurationService} from "src/app/core/services/features/f3-configuration.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-f3-configuration',
  templateUrl: './f3-configuration.component.html',
  styleUrls: ['./f3-configuration.component.scss'],
})
export class F3ConfigurationComponent implements OnInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];

  device: any;

  /**
   * constructor
   * @param commonService
   * @param api
   * @param apiDevice
   * @param route
   */
  constructor(
    private commonService: CommonService,
    private api: ConfigurationService,
    private apiDevice: DeviceService,
    private route: ActivatedRoute,
  ) {
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.onLoadDataDevice();
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
   * on load data component info device
   */
  onLoadDataDevice() {
    const idDevice = this.route.snapshot.paramMap.get('idDevice');
    this.subscription.push(
      this.apiDevice.find(idDevice, '?populate=idTypeDevice,idProvince').subscribe((data: any) => {
        this.device = data;
      })
    );
  }
}
