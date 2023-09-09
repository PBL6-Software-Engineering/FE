import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CommonService} from 'src/app/core/services/common.service';
import {TypeDeviceService} from 'src/app/core/services/features/f1-type-device.service';

@Component({
  selector: 'app-f1-type-device-update',
  templateUrl: './f1-type-device-update.component.html',
  styleUrls: ['./f1-type-device-update.component.scss'],
})
export class F1TypeDeviceUpdateComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  id: any;
  isUpdateImage = false;
  // binding data
  input = {
    image: '',
    name: '',
    thumbnail: '',
  };

  //binding uploads image or file
  @ViewChild('inputImage', {static: false})
  inputImage: ElementRef;

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
    private api: TypeDeviceService,
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
      image: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
  }

  /**
   * ng On Init
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.find(this.id).subscribe(typeDevice => {
      this.input.image = typeDevice.image;
      this.input.name = typeDevice.name;
      this.input.thumbnail = typeDevice.thumbnail;
    })
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
   * on Upload Image Click
   */
  onUploadImageClick() {
    this.subscription.push(
      this.common.uploadImageCore(this.inputImage).subscribe((data) => {
        if (data) {
          this.input.image = data['files'][0];
          this.isUpdateImage = true;
        }
      })
    );
  }

  /**
   * on Update Btn Click
   */
  onUpdateBtnClick() {
    // touch all control to show error
    this.form.markAllAsTouched();

    // check isUpdateImage
    if (!this.isUpdateImage) {
      this.form.controls['image'].removeValidators(Validators.required);
      this.form.controls['image'].updateValueAndValidity();
    }
    // check form pass all validate
    if (!this.form.invalid) {
      let images = [];
      images.push(this.input.image);
      console.log(images);
      // show loading
      this.isLoading$.next(true);

      // check update image
      if (this.isUpdateImage) {
        this.common.comfirmImages(images).subscribe((data) => {
          // Set public image
          this.input.image = data[0][4];
          this.input.thumbnail = data[0][5];
          this.update();
        });
      } else {
        this.update();
      }
    }
  }

  /**
   * update type device
   */
  update(): void {
    this.subscription.push(
      this.api.update(this.id, this.input).subscribe(() => {
        // hide loading
        this.isLoading$.next(false);
        this.cdr.detectChanges();

        this.common.showSuccess('Update Success!');

        // redirect to list
        this.router.navigate(['/features/type-devices']);
      })
    );
  }
}
