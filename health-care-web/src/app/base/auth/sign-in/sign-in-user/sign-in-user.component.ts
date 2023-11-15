import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
// import 'firebase/auth';
import * as auth from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../services/token_storage.service';

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
  constructor(
    private apiService: AuthService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private afAuth: AngularFireAuth,
    private toastrService: ToastrService,
    private tokenStorageService: TokenStorageService
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
            console.log('data user after login', data);
            this.tokenStorageService.saveToken(data.access_token, data.role);
            this.tokenStorageService.saveUser(data);
            this.toastrService.success('Đăng nhập thành công');
            if (data.role === 'user') {
              this.router.navigateByUrl('/');
            } else {
              this.router.navigateByUrl('/admin');
            }
          },
          error: (err) => {
            this.renderer.addClass(loading, 'd-none');
            this.toastrService.error('Đăng nhập thất bại');
          },
        });
    }
  }
  googleLogin() {
    // this.apiService.googleAuth();
    this.afAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((googleResponse) => {
        // Successfully logged in
        console.log(googleResponse);
        // Add your logic here
      })
      .catch((err) => {
        // this.showNotification(err.message);
        console.log(err);
      });
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

  ngOnInit() {}
}
