import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.scss'],
})
export class SignUpUserComponent {
  loginForm: FormGroup;
  isShowEmail = false;
  isShowPass = false;
  isShowConfirm = false;
  isShowName = false;

  constructor(
    private apiService: AuthService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private toastrService: ToastrService
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
          this.loginForm.value.confirm
        )
        .subscribe({
          next: (response) => {
            // response.token
            this.toastrService.success('Đăng kí thành công');
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Đăng kí thất bại:', error);
            this.toastrService.error('Đăng kí thất bại');
            this.renderer.addClass(loading, 'd-none');
          },
        });
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
