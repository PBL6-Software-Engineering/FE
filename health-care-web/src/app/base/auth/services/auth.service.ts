import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { linkApi } from 'src/app/core/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  forgotPass(email: string): Observable<any> {
    const requestBody = { email: email };
    return this.http.post(`${linkApi}/user/forgot-pw-sendcode`, requestBody);
  }
  forgotPassAdmin(email: string): Observable<any> {
    const requestBody = { email: email };
    return this.http.post(`${linkApi}/admin/forgot-pw-sendcode`, requestBody);
  }
  login(email: string, password: string): Observable<any> {
    const requestBody = { email: email, password: password };
    return this.http.post(`${linkApi}/user/login`, requestBody);
  }

  loginAdmin(email: string, password: string): Observable<any> {
    const requestBody = { email: email, password: password };
    return this.http.post(`${linkApi}/admin/login`, requestBody);
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
    return this.http.post(`${linkApi}/infor-user/register`, requestBody);
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
