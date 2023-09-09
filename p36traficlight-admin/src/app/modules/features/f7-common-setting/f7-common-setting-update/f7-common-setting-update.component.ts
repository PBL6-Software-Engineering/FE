import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {CommonSettingService} from 'src/app/core/services/features/f7-common-setting.service';

@Component({
  selector: 'app-f7-common-setting-update',
  templateUrl: './f7-common-setting-update.component.html',
  styleUrls: ['./f7-common-setting-update.component.scss'],
})
export class F7CommonSettingUpdateComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  id: any;

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
   * @param route
   */
  constructor(
    private api: CommonSettingService,
    public common: CommonService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
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
   * ng On Init
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription.push(
      this.api.find(this.id).subscribe((data: any) => {
        this.form.patchValue(data);
      })
    );
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
    this.form.markAllAsTouched();

    // check form pass all validate
    if (!this.form.invalid) {
      // create object update
      const setting = {
        name: this.input.name,
        type: this.input.type,
        numberTime: Number(this.input.numberTime),
        unitTime: this.input.unitTime,
        isShow: this.input.isShow,
      }
      // update
      this.subscription.push(
        this.api.update(this.id, setting).subscribe(() => {
          // hide loading
          this.isLoading$.next(false);
          this.cdr.detectChanges();

          this.common.showSuccess('Sửa thành công!');

          // redirect to list
          this.router.navigate(['/features/common-settings']);
        })
      );
    }
  }
}
