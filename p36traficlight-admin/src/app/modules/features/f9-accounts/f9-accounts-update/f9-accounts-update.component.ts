import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import flatpickr from 'flatpickr';
import { UserService } from 'src/app/core/services/features/user.service';
import { AuthService } from 'src/app/core/services/api/00auth.service';
import {ProvinceService} from "src/app/core/services/common/c5-province.service";

@Component({
  selector: 'app-f9-accounts-update',
  templateUrl: './f9-accounts-update.component.html',
  styleUrls: ['./f9-accounts-update.component.scss'],
})
export class F9AccountsUpdateComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  id: any;

  // binding uploads image or file
  @ViewChild('inputAvatar', { static: false })
  inputAvatar: ElementRef;

  roleEnum = {
    admin1x: 'Admin1.X',
    admin2: 'Admin2',
    user: 'User',
  };
  formUserInfo: FormGroup;
  inputUserInfo: any = {
    fullName: '',
    phone: '',
    email: '',
    avatar: '',
    gender: 'MALE',
    role: '',
    dateOfBirth: 0,
    idProvince: '',
  };

  // form input Date of birth
  dateOfBirthInput = '';

  //show password
  showPassword: boolean;

  // data Provinces
  provinces: any[];

  // binding uploads image or file
  @ViewChild('inputImageAvatar', { static: false })
  inputImageAvatar: ElementRef;

  arrayAvatar: any = [];
  styleAvatar = 'background-image: url(assets/media/svg/files/blank-image.svg)';

  /**
   * constructor()
   * @param userService
   * @param common
   * @param router
   * @param cdr
   * @param formBuilder
   * @param route
   * @param authService
   * @param provinceService
   */
  constructor(
    private userService: UserService,
    public common: CommonService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private provinceService: ProvinceService,
  ) {
    this.subscription.push(
      this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res))
    );

    // add validate for controls
    this.formUserInfo = this.formBuilder.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      avatar: [null],
      phone: [null, [Validators.required,
        Validators.pattern('^\\s*(\\+?84|0)(3|5|7|8|9)\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]\\s*[0-9]' +
          '\\s*[0-9]\\s*[0-9]\\s*$')]],
      dateOfBirth: [null, []],
      gender: [null, []],
      role: [null, []],
      idProvince: [null, [Validators.required]]
    });
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    // get id from url
    this.id = this.route.snapshot.paramMap.get('id');

    // load data by param
    if (this.id) {
      this.onLoadDataById(this.id);
    }

    flatpickr('#dateOfBirthPicker', {
      dateFormat: 'd-m-Y',
      maxDate: 'today',
    });

    this.onLoadAllProvinces();

  }

  /**
   * ng After View Init
   */
  ngAfterViewInit(): void {
    // scroll top screen
    window.scroll({ left: 0, top: 0, behavior: 'smooth' });

    flatpickr('#birthday_datepicker', {
      dateFormat: 'd-m-Y',
      maxDate: 'today',
    });
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
   * on Avatar Upload image Click
   */
  onAvatarUploadImageClick() {
    this.subscription.push(
      this.common.uploadImageCore(this.inputImageAvatar).subscribe((data) => {
        if (data) {
          if (data['files'].length > 0) {
            this.inputUserInfo.avatar = data['files'][0];
          }
        }
      })
    );
  }

  /**
   * onLoadDataById
   * @param id
   */
  onLoadDataById(id: string) {
    // show loading
    this.isLoading$.next(true);

    this.subscription.push(
      this.userService
        .find(
          id,
          `populate=idProvince`
        )
        .subscribe((data) => {
          this.inputUserInfo = {
            fullName: data.fullName,
            phone: data.phone,
            email: data.email,
            role: data.role,
            avatar: data.avatar,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
            idProvince: data.idProvince?._id,
          };
          this.dateOfBirthInput = this.common.formatUnixTimestampDateToDDMMYYY(this.inputUserInfo.dateOfBirth);

          if (this.inputUserInfo.avatar != '') {
            this.arrayAvatar.push(this.inputUserInfo.avatar);
            this.styleAvatar = `background-image: url(${this.inputUserInfo.avatar})`;
          }

          // hide loading
          this.isLoading$.next(false);
          this.cdr.detectChanges();
        })
    );
  }

  /**
   * onUpdateBtnClick
   */
  onUpdateBtnClick() {

    // touch all control to show error
    this.formUserInfo.markAllAsTouched();

    this.inputUserInfo.phone = this.inputUserInfo.phone.replace(/\s+/g, '').trim();

    if (this.inputUserInfo.role === this.roleEnum.admin1x) {
      this.formUserInfo.get('idProvince')?.setErrors(null);
      this.formUserInfo.get('idProvince')?.setValidators(null);

      this.inputUserInfo.idProvince = null;
    }

    if (!this.formUserInfo.invalid) {
      // show loading
      this.isLoading$.next(true);

      this.inputUserInfo.dateOfBirth = Number(new Date(
        this.common.coventDateDDMMYYYYToYYYYMMDD(this.dateOfBirthInput)
      ).getTime());

      // update born
      const { ...rest } = this.inputUserInfo;

      // new useritem
      let userItem: any = {
        ...rest,
      };

      userItem.avatar = this.inputUserInfo.avatar;

      // Create list image uploads
      let images = [];
      images.push(userItem.avatar);
      // check avatar > 0
      if (userItem.avatar != '') {
        this.common.comfirmImages(images).subscribe((data) => {

          // Set public image
          userItem.avatar = data[0][4];

          // update user
          this.updateUser(userItem);
        })
      } else {

        // update User
        this.updateUser(userItem);
      }
    }
    }

  /**
   * onResetPageClick
   */
  onReloadPageClick(id: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([`/features/accounts/update/${id}`]));
  }

  /**
   * On load all province
   */
  onLoadAllProvinces() {
    this.subscription.push(
      this.provinceService.get().subscribe((data: any) => {
        this.provinces = data;
      })
    );
  }

  updateUser(userItem: any) {

    // call api
    this.subscription.push(
      this.userService.update(this.id, userItem).subscribe(
        () => {
          // hide loading
          this.isLoading$.next(false);
          this.cdr.detectChanges();

          this.common.showSuccess('Sửa thành công!');

          // redirect to list
          this.router.navigate(['/features/accounts']);
        },
        (error: any) => {

          // if Phone is already exists
          if ((JSON.stringify(error.error.errors[0].detail)).includes('Phone')) {
            this.formUserInfo.controls['phone'].setErrors({ phoneExists: true} );
          }

          // if Email is already exists
          if ((JSON.stringify(error.error.errors[0].detail)).includes('Email')) {
            this.formUserInfo.controls['email'].setErrors({ emailExists: true} );
          }

          this.common.showError(`Sửa thất bại!`);

          // hide loading
          this.isLoading$.next(false);
          this.cdr.detectChanges();
        }
      )
    );
  }
}
