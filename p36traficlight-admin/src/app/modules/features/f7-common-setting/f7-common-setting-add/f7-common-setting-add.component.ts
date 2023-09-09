import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {CommonSettingService} from 'src/app/core/services/features/f7-common-setting.service';

@Component({
  selector: 'app-f7-common-setting-add',
  templateUrl: './f7-common-setting-add.component.html',
  styleUrls: ['./f7-common-setting-add.component.scss'],
})
export class F7CommonSettingAddComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  // binding data
  input = {
    name: '',
    type: '',
    numberTime: '',
    unitTime: '',
    isShow: true,
  };

  //form
  form: FormGroup;

  /**
   * constructor
   * @param api
   * @param common
   * @param router
   * @param cdr
   * @param formBuilder
   */
  constructor(
    private api: CommonSettingService,
    public common: CommonService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.subscription.push(
      this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res))
    );

    // add validate for controls
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      numberTime: [null, [Validators.required, Validators.pattern('\\d+')]],
      unitTime: [null, [Validators.required]],
      isShow: [null, [Validators.required]],
    });
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
      // create object add new
      const setting = {
        name: this.input.name,
        type: this.input.type,
        numberTime: Number(this.input.numberTime),
        unitTime: this.input.unitTime,
        isShow: this.input.isShow,
      }
      // add new
      this.subscription.push(
        this.api.add(setting).subscribe(() => {
          // hide loading
          this.isLoading$.next(false);
          this.cdr.detectChanges();
          this.common.showSuccess('Thêm mới thành công!');

          // redirect to list
          this.router.navigate(['/features/common-settings']);
        })
      );
    }
  }
}
