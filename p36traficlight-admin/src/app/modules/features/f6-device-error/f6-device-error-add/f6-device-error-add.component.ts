import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from 'src/app/core/services/common.service';
import {DeviceErrorService} from 'src/app/core/services/features/f6-device-error.service';

@Component({
  selector: 'app-f6-device-error-add',
  templateUrl: './f6-device-error-add.component.html',
  styleUrls: ['./f6-device-error-add.component.scss'],
})
export class F6DeviceErrorAddComponent implements OnInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  isCheck: string = '';
  fileName: string;
  uploadTime: Date;

  // binding data
  input: any = {
    name: '',
    code: '',
    reason: '',
    description: '',
  };

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
    private api: DeviceErrorService,
  ) {
    this.subscription.push(
      this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res))
    );

    // add validate for controls
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      reason: [null, [Validators.required]],
      description: [null],
    });
  }

  /**
   * ngOnInit
   */
  ngOnInit() {

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

      // show loading
      this.isLoading$.next(true);

      this.input.code = Number(this.input.code);
      this.subscription.push(
        this.api.add(this.input).subscribe(() => {

            // hide loading
            this.isLoading$.next(false);
            this.cdr.detectChanges();
            this.common.showSuccess('Thêm thành công!');

            // redirect to list
            this.router.navigate(['/features/device-errors']);
          },
          error => {
            // display error
            this.common.showError('Thêm thất bại!');

            // if code device-error duplicate
            if (error.error.errors[0].title === 'Duplicate key') {
              this.form.controls['code'].setErrors({'exist': true});
              this.isLoading$.next(false);
            }
          })
      );
    }
  }

  /**
   * disableWheel
   * @param event
   */
  disableWheel(event: Event) {
    event.preventDefault();
  }
}
