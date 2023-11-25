import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { linkApi } from '../../core/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class TimeWorkingService {
  model = 'time-work';
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/detail`);
  }

  update(obj: any): Observable<any> {
    return this.http.post<any>(`${linkApi}/${this.model}/update`, obj);
  }
}
