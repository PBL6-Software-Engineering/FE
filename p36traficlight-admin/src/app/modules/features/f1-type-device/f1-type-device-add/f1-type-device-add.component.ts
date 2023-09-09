import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { TypeDeviceService } from 'src/app/core/services/features/f1-type-device.service';

@Component({
  selector: 'app-f1-type-device-add',
  templateUrl: './f1-type-device-add.component.html',
  styleUrls: ['./f1-type-device-add.component.scss'],
})
export class F1TypeDeviceAddComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  isCheckStoreService: boolean = true;

  // binding data
  input = {
    image: '',
    name: '',
    thumbnail: '',
  };

  //binding uploads image or file
  @ViewChild('inputImage', { static: false })
  inputImage: ElementRef;

  //form
  form: FormGroup;


  /**
   * Constructor
   * @param api
   * @param storeService
   * @param common
   * @param router
   * @param cdr
   * @param formBuilder
   */
  constructor(
    private api: TypeDeviceService,
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
      image: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
  }

  /**
   * ng On Init
   */
  ngOnInit(): void {
  }

  /**
   * ng After View Init
   */
  ngAfterViewInit(): void {
    // scroll top screen
    window.scroll({ left: 0, top: 0, behavior: 'smooth' });
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
        }
      })
    );
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

      let images = [];
      images.push(this.input.image);
      // check value thumbnail
      if (this.input.image != '') {
        this.common.comfirmImages(images).subscribe((data) => {
          // Set public image
          this.input.image = data[0][4];
          this.input.thumbnail = data[0][5];
          this.subscription.push(
            this.api.add(this.input).subscribe(() => {
              // hide loading
              this.isLoading$.next(false);
              this.cdr.detectChanges();
              this.common.showSuccess('Insert new success!');

              // redirect to list
              this.router.navigate(['/features/type-devices']);
            })
          );
        });
      }
    }
  }
}
