import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { linkApi } from 'src/app/core/constants/api.constant';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  model = 'hospital-service';
  constructor(private http: HttpClient) {}

  getServiceDetail(id: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/detail/${id}`);
  }
}
