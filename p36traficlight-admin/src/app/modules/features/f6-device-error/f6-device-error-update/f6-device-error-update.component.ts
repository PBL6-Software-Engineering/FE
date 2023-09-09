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
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {CommonService} from 'src/app/core/services/common.service';
import {DeviceErrorService} from 'src/app/core/services/features/f6-device-error.service';

@Component({
  selector: 'app-f6-device-error-update',
  templateUrl: './f6-device-error-update.component.html',
  styleUrls: ['./f6-device-error-update.component.scss'],
})
export class F6DeviceErrorUpdateComponent implements OnInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  styleAvatar = 'background-image: url(./assets/media/svg/files/image.svg)';

  // update data
  update: any = {
    name: '',
    code: '',
    reason: '',
    description: '',
  };

  //form
  form: FormGroup;
  id: any;

  /**
   * constructor
   * @param common
   * @param router
   * @param route
   * @param cdr
   * @param formBuilder
   * @param api
   */
  constructor(
    public common: CommonService,
    private router: Router,
    private route: ActivatedRoute,
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
  ngOnInit(): void {

    // get id from url
    this.id = this.route.snapshot.paramMap.get('id');

    // load data by param
    if (this.id) {
      this.onLoadDataById(this.id);
    }

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
      this.api.find(id).subscribe((data) => {
        // load data to view update
        this.update = {
          name: data.name,
          code: data.code,
          reason: data.reason,
          description: data.description,
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

      // show loading
      this.isLoading$.next(true);

      // check code is Exists
      this.api.findOneByCode(this.update.code).subscribe((data: any) => {

        // if not exist or id is the same old id
        if (data === null || data === undefined || data._id == this.id) {
          this.update.code = Number(this.update.code);
          this.subscription.push(
            this.api.update(this.id, this.update).subscribe(() => {

              // hide loading
              this.isLoading$.next(false);
              this.cdr.detectChanges();
              this.common.showSuccess('Sửa thành công!');

              // redirect to list
              this.router.navigate(['/features/device-errors']);
            })
          );
        } else {

          // display error
          this.form.controls['code'].setErrors({'exist': true});
          this.isLoading$.next(false);
        }
      })

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
