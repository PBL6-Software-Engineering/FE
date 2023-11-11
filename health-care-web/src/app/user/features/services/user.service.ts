import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { helps, categoris } from './data';
import { HttpClient } from '@angular/common/http';
import { linkApi } from 'src/app/core/constants/api.constant';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getHelps(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      observer.next(helps);
    });
  }


  getCategoris(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      observer.next(categoris);
    });
  }

  updateProfile(obj: any): Observable<any> {
    const form = new FormData();
    form.set('date_of_birth', obj.date_of_birth);
    form.set('phone', obj.phone);
    form.set('gender', obj.gender);
    form.set('address', obj.address);
    form.set('email', obj.email);
    form.set('name', obj.name);
    form.set('username', obj.username);
    return this.http.post<any>(`${linkApi}/infor-user/update`, form);
  }
}
