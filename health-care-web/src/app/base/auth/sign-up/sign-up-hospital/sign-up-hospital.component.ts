import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-hospital',
  templateUrl: './sign-up-hospital.component.html',
  styleUrls: ['./sign-up-hospital.component.scss'],
})
export class SignUpHospitalComponent {
  loginForm: FormGroup;
  isShowEmail = false;
  isShowPass = false;
  isShowConfirm = false;
  isShowName = false;
  message: string = '';

  constructor(
    private apiService: AuthService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
      name: ['', [Validators.required]],
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
        .signup(
          this.loginForm.value.name,
          this.loginForm.value.email,
          this.loginForm.value.password,
          this.loginForm.value.confirm,
        )
        .subscribe({
          next: (response) => {
            this.showNotification('Đăng nhập thành công');
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.showNotification(error.error.message);
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
      if (this.loginForm.hasError('required', 'password')) {
        this.isShowPass = true;
      }
      if (this.loginForm.hasError('required', 'confirm')) {
        this.isShowConfirm = true;
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
