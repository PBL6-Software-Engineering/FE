import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { linkApi } from '../constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any> {
    return this.http.get<any>(`${linkApi}/province`).pipe(
      shareReplay(1),
    );
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${linkApi}/category`).pipe(
      shareReplay(1),
    );
  }

  getDepartments(): Observable<any> {
    return this.http.get<any>(`${linkApi}/department`).pipe(
      shareReplay(1),
    );
  }
}
