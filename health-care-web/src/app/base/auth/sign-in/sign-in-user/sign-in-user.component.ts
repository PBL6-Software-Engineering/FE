import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
// import 'firebase/auth';
import * as auth from 'firebase/auth';

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
    private afAuth: AngularFireAuth
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

  login() {
    if (this.loginForm.valid) {
      // Biểu mẫu hợp lệ, có thể gọi API đăng nhập
      var loading = this.el.nativeElement.querySelector('#loading');
      this.renderer.removeClass(loading, 'd-none');
      console.log(this.loginForm.value.email);
      this.apiService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          (response) => {
            console.log(
              'Đăng nhập thành công. Token truy cập:',
              response.token
            );
            this.showNotification('Đăng nhập thành công');

            this.router.navigate(['/']);
          },
          (error) => {
            this.renderer.addClass(loading, 'd-none');
            console.error('Đăng nhập thất bại:', error);
            this.showNotification(error.error.message);
          }
        );
    } else {
      // Kiểm tra trường email
      if (
        this.loginForm.hasError('required', 'email') ||
        this.loginForm.hasError('email', 'email') ||
        this.loginForm.hasError('email', 'password')
      ) {
        this.isShowEmail = true;
      }
      if (this.loginForm.hasError('required', 'password')) {
        this.isShowPass = true;
      }
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
        this.showNotification(err.message);
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
