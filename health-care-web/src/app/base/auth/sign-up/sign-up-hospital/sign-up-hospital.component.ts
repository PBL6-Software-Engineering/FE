import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-up-hospital',
  templateUrl: './sign-up-hospital.component.html',
  styleUrls: ['./sign-up-hospital.component.scss'],
})
export class SignUpHospitalComponent {
  loginForm: FormGroup;
  isShowEmail = false;
  isShowPass = false;
  isShowPass2 = false;
  isShowConfirm = false;
  isShowConfirm2 = false;
  isShowName = false;
  isShowPhone = false;
  isShowAddress = false;
  isShowDescription = false;
  isShowUsername = false;
  isShowOr = false;
  message: string = '';
  tagInput: string = '';
  tags: string[] = [];

  constructor(
    private apiService: AuthService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private toastrService: ToastrService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      infrastructure: ['', [Validators.required]],
      description: ['', [Validators.required]],
      username: ['', [Validators.required]],
      code: ['', [Validators.required]],
      xOr: ['', [Validators.required]],
      yOr: ['', [Validators.required]],
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passControl() {
    return this.loginForm.get('password');
  }

  get confirmControl() {
    return this.loginForm.get('confirm');
  }

  get nameControl() {
    return this.loginForm.get('name');
  }
  get usernameControl() {
    return this.loginForm.get('username');
  }
  get phoneControl() {
    return this.loginForm.get('phone');
  }

  get addressControl() {
    return this.loginForm.get('address');
  }
  get descriptionControl() {
    return this.loginForm.get('description');
  }
  get codeControl() {
    return this.loginForm.get('code');
  }
  get xOrControl() {
    return this.loginForm.get('xOr');
  }
  get yOrControl() {
    return this.loginForm.get('yor');
  }
  addTag() {
    this.tagInput = this.loginForm.get('infrastructure')?.value;
    if (this.tagInput.trim() !== '' && !this.tags.includes(this.tagInput)) {
      this.tags.push(this.tagInput.trim());
      this.tagInput = '';
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
  }
  showNotification(message: string) {
    this.message = message;
    const notification = this.el.nativeElement.querySelector('#notification');
    this.renderer.setStyle(notification, 'display', 'block');

    setTimeout(() => {
      this.renderer.setStyle(notification, 'opacity', '0');
    }, 2000);

    setTimeout(() => {
      this.renderer.setStyle(notification, 'display', 'none');
      this.renderer.setStyle(notification, 'opacity', '1');
    }, 4000);
  }

  signup() {
    if (this.loginForm.valid) {
      // Biểu mẫu hợp lệ, có thể gọi API đăng nhập
      var loading = this.el.nativeElement.querySelector('#loading');
      this.renderer.removeClass(loading, 'd-none');
      this.apiService
        .signupHospital(
          this.loginForm.value.name,
          this.loginForm.value.username,
          this.loginForm.value.email,
          this.loginForm.value.password,
          this.loginForm.value.confirm,
          this.loginForm.value.phone,
          this.loginForm.value.code,
          this.loginForm.value.address,
          JSON.stringify(this.tags),
          this.loginForm.value.description,
          JSON.stringify([
            parseInt(this.loginForm.value.xOr),
            parseInt(this.loginForm.value.yOr),
          ]),
        )
        .subscribe({
          next: (response) => {
            this.toastrService.success('Đăng kí thành công');
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.toastrService.error('Đăng kí thất bại');
            this.renderer.addClass(loading, 'd-none');
          },
        });
    } else {
      if (this.loginForm.hasError('required', 'name')) {
        this.isShowName = true;
      }
      if (
        this.loginForm.hasError('required', 'email') ||
        this.loginForm.hasError('email', 'email')
      ) {
        this.isShowEmail = true;
      }
      if (this.loginForm.hasError('minlength', 'password')) {
        this.isShowPass2 = true;
      }
      if (this.loginForm.hasError('minlength', 'confirm')) {
        this.isShowConfirm2 = true;
      }
      if (this.loginForm.hasError('required', 'confirm')) {
        this.isShowConfirm = true;
      }
      if (this.loginForm.hasError('required', 'address')) {
        this.isShowAddress = true;
      }
      if (this.loginForm.hasError('required', 'code')) {
        this.isShowAddress = true;
      }
      if (this.loginForm.hasError('required', 'phone')) {
        this.isShowPhone = true;
      }
      if (this.loginForm.hasError('required', 'description')) {
        this.isShowDescription = true;
      }
      if (this.loginForm.hasError('required', 'username')) {
        this.isShowUsername = true;
      }
      if (this.loginForm.hasError('required', 'password')) {
        this.isShowPass = true;
      }
    }
  }

  hideShowPass() {
    let passFields = document.getElementsByClassName('passwordInp');
    if (passFields != null) {
      for (let i = 0; i < passFields.length; i++) {
        if (passFields[i].getAttribute('type') == 'text') {
          passFields[i].setAttribute('type', 'password');
        } else {
          passFields[i].setAttribute('type', 'text');
        }
      }
    }
  }
}
