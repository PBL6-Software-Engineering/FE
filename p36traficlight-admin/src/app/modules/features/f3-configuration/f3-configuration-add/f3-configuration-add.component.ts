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
import {ConfigurationService} from 'src/app/core/services/features/f3-configuration.service';

@Component({
  selector: 'app-f3-configuration-add',
  templateUrl: './f3-configuration-add.component.html',
  styleUrls: ['./f3-configuration-add.component.scss'],
})
export class F3ConfigurationAddComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  currentPosition: any;

  // binding data
  input = {
    idDevice: '',
    parameter: '',
    byte: '',
    value: '',
  };

  //form
  form: FormGroup;

  /**
   * Constructor
   * @param api
   * @param common
   * @param router
   * @param cdr
   * @param formBuilder
   * @param route
   */
  constructor(
    private api: ConfigurationService,
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
      idDevice: [null, Validators.required],
      parameter: [null, []],
      byte: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(0)]],
      value: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(0)]],
    });
  }

  /**
   * ng On Init
   */
  ngOnInit(): void {
    this.currentPosition = Number(this.route.snapshot.paramMap.get('lastPosition')) + 1;
    if(this.route.parent) {
      this.route.parent.params.subscribe(params => {
        this.input.idDevice = params.idDevice;
        this.form.patchValue({idDevice: params.idDevice});
      })
    }
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
    this.form.markAllAsTouched();

    // check form pass all validate
    if (!this.form.invalid) {
      // show loading
      this.isLoading$.next(true);

      const configuration = {
        idDevice: this.input.idDevice,
        parameter: this.input.parameter,
        byte: Number(this.input.byte),
        value: Number(this.input.value),
      }
      this.subscription.push(
        this.api.add(configuration).subscribe(() => {
          // hide loading
          this.isLoading$.next(false);
          this.cdr.detectChanges();
          this.common.showSuccess('Thêm mới thành công!');
          // redirect to list
          this.router.navigate(['/features/configurations', this.input.idDevice]);
        })
      );
    }
  }
}
