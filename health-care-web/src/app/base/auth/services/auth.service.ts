import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginURL = 'http://localhost:99/api/user/login';
  private signupURL = 'http://localhost:99/api/infor-user/register';
  private forgotPassURL = 'http://localhost:99/api/user/forgot-pw-sendcode';

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}
  forgotPass(email: string): Observable<any> {
    const requestBody = { email: email };
    return this.http.post(this.forgotPassURL, requestBody);
  }
  login(email: string, password: string): Observable<any> {
    const requestBody = { email: email, password: password };
    return this.http.post(this.loginURL, requestBody);
  }
  signup(
    name: string,
    email: string,
    password: string,
    confirm: string
  ): Observable<any> {
    const requestBody = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirm,
    };
    return this.http.post(this.signupURL, requestBody);
  }

  googleAuth() {
    this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['/']);
    });
  }
  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
