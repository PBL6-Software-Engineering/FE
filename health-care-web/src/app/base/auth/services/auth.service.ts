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
    // const requestBody = {
    //   name: "Bệnh viện AZKOKO",
    //   username:""
    //   email: "ZaKOKO@gmail.com",
    //   password: "123456",
    //   password_confirmation: "123456",
    //   phone: "1023123209812",
    //   province_code: "63",
    //   address: "Đà Nẵng",
    //   infrastructure: [],
    //   description: "Một bệnh viện tốt",
    //   location: [1,3],
    // };

    console.log(requestBody);
    return this.http.post(`${linkApi}/infor-hospital/register`, requestBody);
  }
}
