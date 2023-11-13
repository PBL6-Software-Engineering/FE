import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { linkApi } from '../../core/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getTimeWorkDoctor(id_doctor: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/time-work/advise/${id_doctor}`);
  }

  getTimeWorkService(id_service: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/time-work/service/${id_service}`);
  }

  bookDoctor(id_doctor: any, time: any): Observable<any> {
    return this.http.post<any>(`${linkApi}/work-schedule/add-advise`, {
      id_doctor,
      time,
    });
  }

  bookService(id_hospital_service: any, time: any): Observable<any> {
    return this.http.post<any>(`${linkApi}/work-schedule/add-service`, {
      id_hospital_service,
      time,
    });
  }
}
