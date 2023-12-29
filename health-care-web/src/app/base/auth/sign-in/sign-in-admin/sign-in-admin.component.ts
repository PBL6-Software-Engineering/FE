import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../services/token_storage.service';

@Component({
  selector: 'app-sign-in-admin',
  templateUrl: './sign-in-admin.component.html',
  styleUrls: ['./sign-in-admin.component.scss'],
})
export class SignInAdminComponent implements OnInit {
  loginForm: FormGroup;
  isShowEmail = false;
  isShowPass = false;

  constructor(
    private apiService: AuthService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private toastrService: ToastrService,
    private tokenStorageService: TokenStorageService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      // Biểu mẫu hợp lệ, có thể gọi API đăng nhập
      var loading = this.el.nativeElement.querySelector('#loading');
      this.renderer.removeClass(loading, 'd-none');
      this.apiService
        .loginAdmin(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: ({ data }) => {
            this.tokenStorageService.saveToken(data.access_token, data.role);
            this.toastrService.success('Đăng nhập thành công');
            this.router.navigate(['/admin']);
          },
          error: (error) => {
            this.renderer.addClass(loading, 'd-none');
            this.toastrService.error('Đăng nhập thất bại');
            console.log(error);
          },
        });
    }
  }

  hideShowPass() {
    let passField = this.el.nativeElement.querySelector('#password');
    let toggleButton = this.el.nativeElement.querySelector('#toggleButton');
    if (toggleButton?.getAttribute('src') == 'assets/media/icon/eye-off.svg')
      toggleButton?.setAttribute('src', 'assets/media/icon/eye-solid.svg');
    else {
      toggleButton?.setAttribute('src', 'assets/media/icon/eye-off.svg');
    }
    if (passField != null) {
      if (passField.getAttribute('type') == 'text') {
        passField.setAttribute('type', 'password');
      } else {
        passField.setAttribute('type', 'text');
      }
    }
  }

  ngOnInit() {}
}
