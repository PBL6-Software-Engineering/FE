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

  bookDoctor(data: any): Observable<any> {
    return this.http.post<any>(`${linkApi}/work-schedule/add-advise`, data);
  }

  bookService(data: any): Observable<any> {
    return this.http.post<any>(`${linkApi}/work-schedule/add-service`, data);
  }

  addRating(data: any): Observable<any> {
    return this.http.post<any>(`${linkApi}/rating/add`, data);
  }

  updateRating(id_rating: any, data: any): Observable<any> {
    return this.http.post<any>(
      `${linkApi}/rating/update/${id_rating}`,
      data,
    );
  }
}
