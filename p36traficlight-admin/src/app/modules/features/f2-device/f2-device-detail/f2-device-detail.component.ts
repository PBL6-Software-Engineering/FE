import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter, Input,
  OnDestroy,
  OnInit, Output,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {DeviceService} from 'src/app/core/services/features/f2-device.service';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-f2-device-detail',
  templateUrl: './f2-device-detail.component.html',
  styleUrls: ['./f2-device-detail.component.scss'],
})
export class F2DeviceDetailComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];

  // subscription firebase
  subscriptionFirebase: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  isLoadOnInit: boolean = false;

  // interval
  intervals: Map<any, any> = new Map<any, any>();
  statusDevices: Map<number, number> = new Map<number, number>();

  @Input() idGroup: any;
  @Input() idDevice: any;
  @Input() isReloadData = false;

  @Output() closeComponent = new EventEmitter<any>();
  @Output() addToGroup = new EventEmitter<any>();
  @Output() removeMarker = new EventEmitter<any>();
  @Output() clearAddToGroup = new EventEmitter<any>();
  @Output() selectedMarker = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();

  idDeviceDelete: any;
  isDeletedGroup: boolean;
  group: any;

  /**
   * Constructor
   * @param api
   * @param common
   * @param router
   * @param cdr
   * @param formBuilder
   * @param firebase
   */
  constructor(
    private api: DeviceService,
    private common: CommonService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private firebase: AngularFireDatabase
  ) {
    this.subscription.push(
      this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res))
    );
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
  }

  /**
   * ngAfterViewInit
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
   * ngOnChanges
   */
  ngOnChanges(): void {
    // reload data when idGroup change
    if (this.isReloadData) {
      this.findGroupById();
    }
  }

  /**
   * findGroupById
   */
  findGroupById() {
    // exist idGroup then load data
    if (this.idGroup !== '' && this.idGroup) {
      this.isLoading$.next(true);
      this.subscription.push(
        this.api.findGroupById(this.idGroup).pipe(
          finalize(() => {
            this.isLoading$.next(false);
          })
        ).subscribe(data => {
          this.clearGetOldRealtime();
          this.group = data;
          this.getRealtimeDatasource();
        })
      );
    }
  }

  /**
   * onAddToGroup => add device to group
   */
  onAddToGroup() {
    this.addToGroup.emit({
      idGroup: this.group._id,
      idProvince: this.group.idProvince._id,
      position: this.group.childs.length > 0 ? this.group.childs[this.group.childs.length - 1].position + 1 : 1,
    });
  }

  /**
   * updateIdDeviceDeleted
   * @param idDevice
   * @param isDeletedGroup
   */
  updateIdDeviceDeleted(idDevice: any, isDeletedGroup: boolean) {
    this.idDeviceDelete = idDevice;
    this.isDeletedGroup = isDeletedGroup;
  }

  /**
   * delete
   */
  delete() {
    if (this.isDeletedGroup) {
      const ids = [this.group._id];
      this.group.childs.forEach((child: any) => ids.push(child._id))
      this.subscription.push(
        this.api.deleteManyByIds(ids).subscribe(() => {
          this.common.showSuccess('Xoá thành công !!!');
          this.router.navigateByUrl('/features/devices');
        })
      );
    } else {
      this.subscription.push(
        this.api.deleteDeviceInGroup(this.group._id, this.idDeviceDelete).subscribe(() => {
          this.common.showSuccess('Xoá thành công !!!');
          this.group.childs = this.group.childs.filter((item: any) => item._id !== this.idDeviceDelete);
          this.removeMarker.emit(this.idDeviceDelete);
          this.idDeviceDelete = '';
        })
      );
    }
  }

  /**
   * getRealtimeDatasource
   */
  getRealtimeDatasource() {
    this.subscriptionFirebase.push(
      this.firebase.object(`devices/${this.group.deviceCode}`).valueChanges()
        .subscribe((item: any) => {
          if (item && item.data) {
            this.group.childs.forEach((c: any) => {
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
    );
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
   * onClickDevice
   * @param id
   */
  onClickDevice(id: any) {
    if (this.idDevice === id) {
      return;
    }
    this.idDevice = id;
    // call method active id
    this.selectedMarker.emit(id);
  }

  /**
   * onClickGroup
   */
  onClickGroup() {
    this.selectedMarker.emit(this.group._id);
    this.idDevice = undefined;
  }

  /**
   * updateGroupDevice
   * @param group
   */
  updateGroupDevice(group: any) {
    this.group = group;
  }

  /**
   * onUpdate
   */
  onUpdate(id: string, typeUpdate: string) {
    this.update.emit({id, typeUpdate});
  }

  /**
   * forwardConfiguration
   */
  forwardConfiguration() {
    window.localStorage.setItem('previousUrl', `/features/devices/detail/${this.group._id}`);
    this.router.navigateByUrl(`/features/configurations/${this.group._id}`);
  }
}
