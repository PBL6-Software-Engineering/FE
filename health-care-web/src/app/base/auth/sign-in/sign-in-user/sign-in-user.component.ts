import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../services/token_storage.service';
import {
  SocialAuthService,
  FacebookLoginProvider,
  SocialUser,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-sign-in-user',
  templateUrl: './sign-in-user.component.html',
  styleUrls: ['./sign-in-user.component.scss'],
})
export class SignInUserComponent implements OnInit {
  loginForm: FormGroup;
  isShowEmail = false;
  isShowPass = false;
  responseData: any;
  message: string = '';

  socialUser!: SocialUser;

  constructor(
    private apiService: AuthService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private toastrService: ToastrService,
    private tokenStorageService: TokenStorageService,
    private socialAuthService: SocialAuthService,
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
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: ({ data }) => {
            this.tokenStorageService.saveToken(data.access_token, data.role);
            this.tokenStorageService.saveUser(data);
            this.toastrService.success('Đăng nhập thành công');
            if (data.role === 'user') {
              this.router.navigateByUrl('/');
            } else {
              if (data.role === 'hospital') {
                this.router.navigateByUrl('/admin/dashboard');
              } else {
                this.router.navigateByUrl(
                  `/admin/account-setting/update-info/${data.role}`,
                );
              }
            }
          },
          error: (err) => {
            this.renderer.addClass(loading, 'd-none');
            this.toastrService.error('Đăng nhập thất bại');
          },
        });
    }
  }

  hideShowPass() {
    let passField = document.getElementById('password');
    let toggleButton = document.getElementById('toggleButton');
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

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      if (user.provider === 'GOOGLE') {
        this.loginGoogle(user);
      } 
      // else if (user.provider === 'FACEBOOK') {
      //   this.loginFacebook(user);
      // }
    });
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  loginGoogle(user: any): void {
    this.apiService
      .loginGoogle({
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.photoUrl,
      })
      .subscribe({
        next: ({ data }) => {
          this.tokenStorageService.saveToken(data.access_token, data.role);
          this.tokenStorageService.saveUser(data);
          this.toastrService.success('Đăng nhập thành công');
          if (data.role === 'user') {
            this.router.navigateByUrl('/');
          } else {
            if (data.role === 'hospital') {
              this.router.navigateByUrl('/admin/dashboard');
            } else {
              this.router.navigateByUrl(
                `/admin/account-setting/update-info/${data.role}`,
              );
            }
          }
        },
        error: (err) => {
          this.toastrService.error('Đăng nhập thất bại');
        },
      });
  }

  loginFacebook(user: any): void {
    this.apiService
      .loginFacebook({
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.photoUrl,
      })
      .subscribe({
        next: ({ data }) => {
          this.tokenStorageService.saveToken(data.access_token, data.role);
          this.tokenStorageService.saveUser(data);
          this.toastrService.success('Đăng nhập thành công');
          if (data.role === 'user') {
            this.router.navigateByUrl('/');
          } else {
            if (data.role === 'hospital') {
              this.router.navigateByUrl('/admin/dashboard');
            } else {
              this.router.navigateByUrl(
                `/admin/account-setting/update-info/${data.role}`,
              );
            }
          }
        },
        error: (err) => {
          this.toastrService.error('Đăng nhập thất bại');
        },
      });
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }
}
