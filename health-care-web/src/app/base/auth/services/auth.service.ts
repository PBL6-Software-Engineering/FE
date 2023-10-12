import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:99/api/user/login';

  constructor(private http: HttpClient) { }
  login(username:string , password:string): Observable<any> {
    const requestBody = {"email":username, "password":password};
    return this.http.post(this.apiUrl,requestBody);
  }
}
