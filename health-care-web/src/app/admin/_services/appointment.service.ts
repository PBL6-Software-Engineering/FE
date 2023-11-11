import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { linkApi } from '../../core/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  model = 'work-schedule';
  constructor(private http: HttpClient) {}

  getAppointmentDoctor({
    startDate = '2023-11-06',
    endDate = '2023-11-12',
  }): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/doctor?startDate=${startDate}&endDate=${endDate}`);
  }

  getAppointmentHospital({
    startDate = '2023-11-06',
    endDate = '2023-11-12',
  }): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/hospital?startDate=${startDate}&endDate=${endDate}`);
  }

  cancleAppointment(id_work_schedule: string): Observable<any> {
    return this.http.delete<any>(
      `${linkApi}/${this.model}/hospital-cancel/${id_work_schedule}`
    );
  }
}
