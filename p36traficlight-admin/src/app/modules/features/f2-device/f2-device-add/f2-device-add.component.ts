import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter, Input,
  OnDestroy,
  OnInit, Output, ViewEncapsulation,
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
  selector: 'app-f2-device-add',
  templateUrl: './f2-device-add.component.html',
  styleUrls: ['./f2-device-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class F2DeviceAddComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  @Output() listenerAfterAddSuccess = new EventEmitter<any>();
  @Output() openComponentDetail = new EventEmitter<any>();
  @Input() coordinate: any;
  @Input() typeAdd: any;
  @Input() idGroup: any = '';
  @Input() idProvince: any = '';
  @Input() isReloadData = false;
  @Input() position = 0;

  formCreateGroup: FormGroup;
  formCreateDevice: FormGroup;
  typeDevices: any = [];
  provinces: any = [];

  port = '';
  // binding data
  inputGroup = {
    name: '',
    idTypeDevice: '',
    idProvince: '',
    deviceCode: '',
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
    isGroup: false
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
      {type: 'required', message: 'Click chuột phải trên bản đồ để lấy toạ độ.'},
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
   * @param common
   * @param router
   * @param cdr
   * @param formBuilder
   * @param provinceService
   * @param typeDeviceService
   * @param el
   */
  constructor(
    private api: DeviceService,
    private common: CommonService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private provinceService: ProvinceService,
    private typeDeviceService: TypeDeviceService,
    private el: ElementRef
  ) {
    this.subscription.push(
      this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res))
    );

    // add validate for controls
    this.formCreateGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      idTypeDevice: [null, [Validators.required]],
      idProvince: [null, [Validators.required]],
      coordinate: [null, [Validators.required]],
      deviceCode: [null, [Validators.required, Validators.pattern('\\d+')]],
      ip: [null, []],
      port: [null, [Validators.pattern('\\d+')]],
    });

    this.formCreateDevice = this.formBuilder.group({
      name: [null, [Validators.required]],
      idTypeDevice: [null, [Validators.required]],
      position: [null, [Validators.required, Validators.pattern('\\d+')]],
      coordinate: [null, [Validators.required]],
    });
  }

  /**
   * ng On Init
   */
  ngOnInit(): void {
    this.typeAdd = this.typeAdd === 'device' ? 'device' : 'group';
    this.subscription.push(this.typeDeviceService.get().subscribe(t => {
      this.typeDevices = t;
    }));
    this.subscription.push(this.provinceService.get().subscribe(t => {
      this.provinces = t;
    }));
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
   * on Add New Btn Click
   */
  onAddNewBtnClick() {
    // touch all control to show error
    if (this.typeAdd === 'group' && this.formCreateGroup.invalid) {
      this.formCreateGroup.markAllAsTouched();
      return;
    }
    if (this.typeAdd === 'device' && this.formCreateDevice.invalid) {
      this.formCreateDevice.markAllAsTouched();
      return;
    }
    if (this.typeAdd === 'group') {
      this.inputGroup.port = this.port === '' || !this.port ? -1 : +this.port;
      this.create(this.inputGroup);
    } else {
      this.inputDevice.position = this.position;
      this.create(this.inputDevice);
    }
  }

  /**
   * create => create group or device
   * @param data
   */
  create(data: any) {
    // check form pass all validate
    // show loading
    this.isLoading$.next(true);

    // if add device to group
    let query = '';
    if (this.typeAdd === 'device') {
      query = '?idGroup=' + this.idGroup;
    }
    this.subscription.push(
      this.api.add(data, query).pipe(finalize(() => {
        this.isLoading$.next(false);
      }))
        .subscribe({
            next: (data: any) => {
              this.cdr.detectChanges();
              this.listenerAfterAddSuccess.emit(data._id);
              this.reset();
              this.common.showSuccess('Thêm mới thành công!');
            },
            error: (error: any) => {
              this.handleError(error);
            }
          }
        )
    );
  }

  /**
   * back
   */
  back() {
    // back to component list
    if (this.typeAdd === 'group') {
      this.router.navigateByUrl('/features/devices');
    } else {
      // back to display detail
      this.openComponentDetail.emit();
    }
  }

  /**
   * ngOnChanges
   */
  ngOnChanges(): void {
    // reload Data when display component add
    if (this.isReloadData) {
      this.typeAdd = this.typeAdd === 'device' ? 'device' : 'group';
      this.inputDevice.coordinate = this.coordinate;
      this.inputGroup.coordinate = this.coordinate;

      this.formCreateDevice.patchValue({coordinate: this.coordinate});
      this.formCreateGroup.patchValue({coordinate: this.coordinate});
      this.inputDevice.idProvince = this.idProvince;
    }
  }

  /**
   * reset => reset data form create
   */
  reset(): void {
    this.formCreateDevice.reset();
    this.formCreateGroup.reset();
    this.formCreateGroup.patchValue({idTypeDevice: '', idProvince: ''})
    this.formCreateDevice.patchValue({idTypeDevice: '', idProvince: ''})
  }

  /**
   * cancel() => cancel add new
   */
  cancel() {
    this.back();
    this.reset();
  }

  handleError(error: any) {
    let message = error.error.errors[0].detail;
    message = message.split(':');
    if (message[0] === 'position') {
      this.formCreateDevice.controls['position'].setErrors({'isExist': true});
    } else if (message[0] === 'deviceCode') {
      this.formCreateGroup.controls['deviceCode'].setErrors({'isExist': true});
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
    if (this.inputGroup.idProvince === '') {
      this.el.nativeElement.querySelector('.ng-select .ng-select-container').style.color = '#A1A5B7'
    } else {
      this.el.nativeElement.querySelector('.ng-select .ng-select-container').style.color = '#464747'
    }
  }
}
