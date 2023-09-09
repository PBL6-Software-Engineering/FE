import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import flatpickr from 'flatpickr';
import {CommonService} from 'src/app/core/services/common.service';
import {F5FirmwareService} from 'src/app/core/services/features/f5-firmware.service';

@Component({
  selector: 'app-f5-firmware-update',
  templateUrl: './f5-firmware-update.component.html',
  styleUrls: ['./f5-firmware-update.component.scss'],
})
export class F5FirmwareUpdateComponent implements OnInit, OnDestroy {

  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  //binding uploads image or file
  @ViewChild('inputFile', { static: false })
  inputFile: ElementRef;

  // update data
  update: any = {
    nameModel: '',
    version: '',
    dateRelease: '',
    description: '',
    file: {
      url: '',
      name: '',
      lastModified: 0,
    },
  };

  // check is change File
  isChangeFile = false;

  //form
  form: FormGroup;
  id: any;
  amGet: boolean = false;
  amPost: boolean = false;
  amPut: boolean = false;
  amDelete: boolean = false;


  /**
   * constructor
   * @param common
   * @param router
   * @param route
   * @param cdr
   * @param formBuilder
   * @param firmwareService
   */
  constructor(
    public common: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private firmwareService: F5FirmwareService,
  ) {
    this.subscription.push(
      this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res))
    );

    // add validate for controls
    this.form = this.formBuilder.group({
      nameModel: [null, [Validators.required]],
      version: [null, [Validators.required]],
      dateRelease: [null, [Validators.required]],
      description: [null],
      file: [null],
    });
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {

    // get id from url
    this.id = this.route.snapshot.paramMap.get('id');

    // load data by param
    if (this.id) {
      this.onLoadDataById(this.id);
    }

    // load date release
    flatpickr('#dateRelease_datePicker', {
      dateFormat: 'd-m-Y',
      maxDate: new Date(),
      locale: 'vn',
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
   * onLoadDataById
   * @param id
   */
  onLoadDataById(id: String) {
    // show loading
    this.isLoading$.next(true);
    this.subscription.push(
      this.firmwareService.find(id).subscribe((data) => {
        // load data to view update
        this.update = {
          nameModel: data.nameModel,
          version: data.version,
          dateRelease: this.common.formatUnixTimestampDateToDDMMYYY(data.dateRelease),
          description: data.description,
          file: data.file,
        };

        //hide loading
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
    this.form.markAllAsTouched();

    if (!this.form.invalid) {
      let files = [];
      files.push(this.update.file.url);
      // set value of input.dateRelease is UnixTimestamp
      this.update.dateRelease = new Date(this.common.coventDateDDMMYYYYToYYYYMMDD(this.update.dateRelease)).getTime();

      // show loading
      this.isLoading$.next(true);

      // nếu có click vào chọn file
      if (this.isChangeFile) {
        this.subscription.push(
          this.common.comfirmImages(files).subscribe({
            next: (data) => {
              this.update.file.url = data[0][0];
              this.updateFirmware();
            },
            error: () => {
              this.common.showError('Sửa thất bại');
              this.isLoading$.next(false);
              this.update.dateRelease = this.common.formatUnixTimestampDateToDDMMYYY(this.update.dateRelease);
              this.cdr.detectChanges();
            }
          })
        );
      } else {
        this.updateFirmware();
      }
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.update.file.name = file.name;
    this.update.file.lastModified = new Date().getTime();

    this.isChangeFile = true;

    // check file have ext is .bin
    if (!this.common.isFileValid(file.name, ['.bin'], true )) {
      this.form.controls['file'].setErrors({'extNotValid': true});
      this.isLoading$.next(false);
    } else {
      this.subscription.push(
        this.common.uploadImageCore(this.inputFile).subscribe((data) => {
          if (data) {
            this.update.file.url = data['files'][0];
          }
        })
      );
    }
  }

  updateFirmware() {
    this.subscription.push(
      this.firmwareService.update(this.id, this.update).subscribe({
        next: () => {
          // hide loading
          this.isLoading$.next(false);
          this.cdr.detectChanges();
          this.common.showSuccess('Sửa thành công!');

          // redirect to list
          this.router.navigate(['/features/firmwares']);
        },
        error: () => {
          this.common.showError('Sửa thất bại!');
          this.isLoading$.next(false);
          this.update.dateRelease = this.common.formatUnixTimestampDateToDDMMYYY(this.update.dateRelease);
          this.cdr.detectChanges();
        }
      })
    )
  }
}
