import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, Input,
  OnDestroy,
  OnInit, ViewEncapsulation,
} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {DeviceService} from 'src/app/core/services/features/f2-device.service';

@Component({
  selector: 'app-f2-device-modal-command',
  templateUrl: './f2-device-modal-command.component.html',
  styleUrls: ['./f2-device-modal-command.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class F2DeviceModalCommandComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  @Input() device: any;

  /**
   * constructor
   * @param api
   * @param common
   * @param router
   * @param cdr
   */
  constructor(
    private api: DeviceService,
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
}
