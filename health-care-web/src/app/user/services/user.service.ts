import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { helps } from './data';
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

  updateProfile(obj: any): Observable<any> {
    const form = new FormData();
    for (const key of Object.keys(obj)) {
      form.set(key, obj[key]);
    }
    return this.http.post<any>(`${linkApi}/infor-user/update`, form);
  }

  changePassword(obj: any): Observable<any> {
    return this.http.post<any>(`${linkApi}/user/change-password`, obj);
  }
}
