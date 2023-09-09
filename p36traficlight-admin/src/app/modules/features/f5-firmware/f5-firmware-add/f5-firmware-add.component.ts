import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef, ViewChild, ElementRef,
} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import flatpickr from 'flatpickr';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from 'src/app/core/services/common.service';
import {F5FirmwareService} from 'src/app/core/services/features/f5-firmware.service';

@Component({
  selector: 'app-f5-firmware-add',
  templateUrl: './f5-firmware-add.component.html',
  styleUrls: ['./f5-firmware-add.component.scss'],
})
export class F5FirmwareAddComponent implements OnInit, OnDestroy {

  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  isCheck: string = '';
  fileName: string;
  uploadTime: Date;

  // binding data
  input: any = {
    nameModel: '',
    version: '',
    dateRelease: '',
    description: '',
    file: {
      name: '',
      url: '',
      lastModified: 0,
    },
  };

  // file selected
  selectedFile: File;

  //binding uploads image or file
  @ViewChild('inputFile', {static: false})
  inputFile: ElementRef;

  //form
  form: FormGroup;

  /**
   * constructor
   * @param common
   * @param router
   * @param cdr
   * @param formBuilder
   * @param api
   */
  constructor(
    public common: CommonService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private api: F5FirmwareService,
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
      file: [null, [Validators.required]],
    });
  }

  /**
   * ngOnInit
   */
  ngOnInit() {

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
   * onAddNewBtnClick
   */
  onAddNewBtnClick() {
    // touch all control to show error
    this.form.markAllAsTouched();
    // check form pass all validate
    if (!this.form.invalid) {

      let files = [];
      files.push(this.input.file.url);
      // set value of input.dateRelease is UnixTimestamp
      this.input.dateRelease = new Date(this.common.coventDateDDMMYYYYToYYYYMMDD(this.input.dateRelease)).getTime();
        // show loading
        this.isLoading$.next(true);
        this.subscription.push(
          this.common.comfirmImages(files).subscribe({
            next: (data) => {
              this.input.file.url = data[0][0];
              this.api.add(this.input).subscribe({
                next: () => {
                  // hide loading
                  this.isLoading$.next(false);
                  this.cdr.detectChanges();
                  this.common.showSuccess('Thêm thành công!');

                  // redirect to list
                  this.router.navigate(['/features/firmwares']);
                },
                error: () => {
                  this.common.showError('Thêm thất bại!');
                  this.isLoading$.next(false);
                  this.input.dateRelease = this.common.formatUnixTimestampDateToDDMMYYY(this.input.dateRelease);
                  this.cdr.detectChanges();
                }
              })
            },
            error: () => {
              this.common.showError('Thêm thất bại!');
              this.isLoading$.next(false);
              this.input.dateRelease = this.common.formatUnixTimestampDateToDDMMYYY(this.input.dateRelease);
              this.cdr.detectChanges();
            }
          })
        )
    }
  }

  /**
   * onFileSelected
   * @param event
   */
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.input.file.name = file.name;
    this.input.file.lastModified = new Date().getTime();
    if (!this.common.isFileValid(file.name, ['.bin'], true)) {
      this.form.controls['file'].setErrors({'extNotValid': true});
      this.isLoading$.next(false);
    } else {
      this.subscription.push(
        this.common.uploadImageCore(this.inputFile).subscribe((data) => {
          if (data) {
            this.input.file.url = data['files'][0];
          }
        })
      );
    }
  }
}
