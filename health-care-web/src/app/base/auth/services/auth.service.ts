import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { linkApi } from 'src/app/core/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  forgotPass(email: string): Observable<any> {
    return this.http.post(`${linkApi}/user/forgot-pw-sendcode`, { email });
  }

  forgotPassAdmin(email: string): Observable<any> {
    return this.http.post(`${linkApi}/admin/forgot-pw-sendcode`, { email });
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
    confirm: string,
  ): Observable<any> {
    const requestBody = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirm,
    };
    return this.http.post(`${linkApi}/infor-user/register`, requestBody);
  }

  signupHospital(
    name: string,
    username: string,
    email: string,
    password: string,
    confirm: string,
    phone: string,
    province_code: number,
    address: string,
    infrastructure: string,
    description: string,
    location: string,
  ): Observable<any> {
    const requestBody = {
      name: name,
      username: username,
      email: email,
      password: password,
      password_confirmation: confirm,
      phone: phone,
      province_code: province_code,
      address: address,
      infrastructure: infrastructure,
      description: description,
      location: location,
    };
    return this.http.post(`${linkApi}/infor-hospital/register`, requestBody);
  }

  verifyEmailUser(token: string): Observable<any> {
    const requestBody = { token: token };
    return this.http.post(`${linkApi}/user/verify-email`, requestBody);
  }

  verifyEmailAdmin(token: string): Observable<any> {
    const requestBody = { token: token };
    return this.http.post(`${linkApi}/admin/verify-email`, requestBody);
  }

  resetPassUser(obj: any) {
    return this.http.post(`${linkApi}/user/forgot-update`, obj);
  }

  resetPassAdmin(obj: any) {
    return this.http.post(`${linkApi}/admin/forgot-update`, obj);
  }

  loginGoogle(obj: any): Observable<any> {
    return this.http.post(`${linkApi}/infor-user/login-google`, obj);
  }
}
