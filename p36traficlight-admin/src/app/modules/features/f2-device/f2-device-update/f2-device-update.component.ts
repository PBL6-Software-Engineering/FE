import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter, Input,
  OnDestroy,
  OnInit, Output, SimpleChanges, ViewEncapsulation,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {DeviceService} from 'src/app/core/services/features/f2-device.service';
import {ProvinceService} from "src/app/core/services/common/c5-province.service";
import {TypeDeviceService} from "src/app/core/services/features/f1-type-device.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-f2-device-update',
  templateUrl: './f2-device-update.component.html',
  styleUrls: ['./f2-device-update.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class F2DeviceUpdateComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  isError: boolean = false;

  isLoadingUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingUpdate: boolean;

  @Output() openComponentDetail = new EventEmitter<any>();
  @Output() listenerAfterUpdateSuccess = new EventEmitter<any>();
  @Input() coordinate: any;
  @Input() id: any;
  @Input() idGroup: any;
  @Input() typeUpdate: string;
  @Input() isReloadData = false;
  @Input() backHref: string;

  typeDevices: any = [];
  provinces: any = [];

  formUpdateGroup: FormGroup;
  formUpdateDevice: FormGroup;

  device: any;

  port = '';
  // binding data
  inputGroup = {
    name: '',
    idTypeDevice: '',
    idProvince: '',
    deviceCode: 0,
    ip: '',
    port: 0,
    coordinate: '',
    isGroup: true,
  };
  inputDevice = {
    name: '',
    idTypeDevice: '',
    idProvince: '',
    position: 0,
    coordinate: '',
    isGroup: false,
  };

  // message notify error
  validationMessages = {
    name: [
      {type: 'required', message: 'Tên không được để trống.'},
    ],
    deviceCode: [
      {type: 'required', message: 'Mã thiết bị không được để trống.'},
      {type: 'pattern', message: 'Mã thiết bị phải là một số dương.'},
      {type: 'isExist', message: 'Mã thiết bị đã tồn tại trong nhóm.'}
    ],
    port: [
      {type: 'pattern', message: 'Cổng thiết bị phải là một số dương.'},
    ],
    coordinate: [
      {type: 'required', message: 'Click trên bản đồ để chọn toạ độ.'},
    ],
    idTypeDevice: [
      {type: 'required', message: 'Loại thiết bị không được để trống.'},
    ],
    idProvince: [
      {type: 'required', message: 'Địa bàn không được để trống.'},
    ],
    position: [
      {type: 'required', message: 'Vị trí không được để trống.'},
      {type: 'pattern', message: 'Vị trí phải là một số dương.'},
      {type: 'isExist', message: 'Vị trí đã tồn tại trong nhóm.'}
    ],
  };


  /**
   * constructor
   * @param api
   * @param apiProvince
   * @param apiTypeDevice
   * @param common
   * @param router
   * @param cdr
   * @param formBuilder
   * @param el
   */
  constructor(
    private api: DeviceService,
    private apiProvince: ProvinceService,
    private apiTypeDevice: TypeDeviceService,
    private common: CommonService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private el: ElementRef
  ) {
    this.subscription.push(
      this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res))
    );

    this.subscription.push(
      this.isLoadingUpdate$.asObservable().subscribe((res) => (this.isLoadingUpdate = res))
    );

    // add validate for controls
    this.formUpdateGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      idTypeDevice: [null, [Validators.required]],
      idProvince: [null, [Validators.required]],
      deviceCode: [null, [Validators.required, Validators.pattern('\\d+')]],
      ip: [null, []],
      port: [null, [Validators.pattern('\\d+')]],
      coordinate: [null, [Validators.required]],
    });

    this.formUpdateDevice = this.formBuilder.group({
      name: [null, [Validators.required]],
      idTypeDevice: [null, [Validators.required]],
      idProvince: [null, [Validators.required]],
      position: [null, [Validators.required, Validators.pattern('\\d+')]],
      coordinate: [null, [Validators.required]],
    });
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    // this.isLoading = true;
    this.subscription.push(this.apiTypeDevice.get().subscribe(t => {
      this.typeDevices = t;
    }));
    this.subscription.push(this.apiProvince.get().subscribe(t => {
      this.provinces = t;
    }))
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
   * on Update Btn Click
   */
  onUpdateBtnClick() {
    // touch all control to show error
    if (this.typeUpdate === 'group' && this.formUpdateGroup.invalid) {
      this.formUpdateGroup.markAllAsTouched();
      return;
    }
    if (this.typeUpdate === 'device' && this.formUpdateDevice.invalid) {
      this.formUpdateDevice.markAllAsTouched();
      return;
    }
    if (this.typeUpdate === 'group') {
      this.inputGroup.port = this.port === '' || !this.port ? -1 : +this.port;
    }
    this.update(this.typeUpdate === 'group' ? this.inputGroup : this.inputDevice);
  }

  /**
   * Update
   * @param data
   */
  update(data: any) {
    this.isLoadingUpdate$.next(true);
    let query = '';
    if (this.typeUpdate === 'device') {
      query = '?idGroup=' + this.idGroup;
    }
    this.subscription.push(
      this.api.update(this.id, data, query).pipe(finalize(() => {
        this.isLoadingUpdate$.next(false);
      }))
        .subscribe({
          next: (data: any) => {
            this.device = data;
            this.patchValueToForm();
            this.cdr.detectChanges();
            this.common.showSuccess('Sửa thành công!');
            this.back();
            this.listenerAfterUpdateSuccess.emit(data._id);
          },
          error: (error: any) => {
            this.handleError(error);
          }
        })
    );
  }

  /**
   * ngOnChanges => update coordinate when change
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.isReloadData) {
      if(this.id && changes.id) {
        if(changes.id.currentValue !== changes.id.previousValue) {
          this.findRecordUpdate();
        }
      }

      this.inputDevice.coordinate = this.coordinate;
      this.inputGroup.coordinate = this.coordinate;
      this.formUpdateDevice.patchValue({coordinate: this.coordinate});
      this.formUpdateGroup.patchValue({coordinate: this.coordinate});
    }
  }

  /**
   * handleError
   * @param error
   */
  handleError(error: any) {
    let message = error.error.errors[0].detail;
    message = message.split(':');
    if (message[0] === 'position') {
      this.formUpdateDevice.controls['position'].setErrors({'isExist': true});
    } else if (message[0] === 'deviceCode') {
      this.formUpdateGroup.controls['deviceCode'].setErrors({'isExist': true});
    }
  }

  /**
   * disableWheel
   * @param event
   */
  disableWheel(event: Event) {
    event.preventDefault();
  }

  /**
   * changeColorSelected
   */
  changeColorSelected() {
    if (this.inputGroup.idProvince === '' && this.el.nativeElement.querySelector('.ng-select .ng-select-container')) {
      this.el.nativeElement.querySelector('.ng-select .ng-select-container').style.color = '#A1A5B7'
    } else if(this.el.nativeElement.querySelector('.ng-select .ng-select-container')) {
      this.el.nativeElement.querySelector('.ng-select .ng-select-container').style.color = '#464747'
    }
  }

  /**
   * back
   */
  back() {
    if (this.backHref === '') {
      this.router.navigateByUrl('/features/devices');
    } else {
      this.openComponentDetail.emit();
    }
  }

  /**
   * findRecordUpdate
   * @private
   */
  private findRecordUpdate() {
    this.isLoading = true;
    this.subscription.push(
      this.api.find(this.id).subscribe({
        next: (data) => {
          this.device = data;
          this.patchValueToForm();
          this.changeColorSelected();
          // wait change selected province
          setTimeout(() => {
            this.isLoading = false;
          }, 200);
        },
        error: () => {
          this.isError = true;
        }
      })
    );
  }

  /**
   * patchValueToForm
   */
  patchValueToForm() {
    this.inputDevice.idProvince = this.device.idProvince._id;
    this.inputGroup.idProvince = this.device.idProvince._id;
    if (this.typeUpdate === 'group') {
      this.formUpdateGroup.patchValue(this.device);
      this.formUpdateGroup.get('deviceCode')?.setValue(+this.device.deviceCode);
      if(this.device.port === -1) {
        this.formUpdateGroup.get('port')?.setValue('');
      }
    } else {
      this.formUpdateDevice.patchValue(this.device);
    }
    this.coordinate = this.device.coordinate;
  }
}
