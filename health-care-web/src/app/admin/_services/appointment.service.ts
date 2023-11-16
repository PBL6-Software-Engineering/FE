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
    return this.http.get<any>(
      `${linkApi}/${this.model}/doctor?startDate=${startDate}&endDate=${endDate}`
    );
  }

  getAppointmentHospital({
    startDate = '2023-11-06',
    endDate = '2023-11-12',
    typeSort = 'time',
    typeBook = '',
    status = ''
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/hospital?startDate=${startDate}&endDate=${endDate}&typesort=${typeSort}&is_service=${typeBook}&status=${status}`
    );
  }

  cancleAppointment(id_work_schedule: string): Observable<any> {
    return this.http.delete<any>(
      `${linkApi}/${this.model}/hospital-cancel/${id_work_schedule}`
    );
  }

  getListDoctorSpecify(id_work_schedule: any): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/list-specify/${id_work_schedule}`
    );
  }

  specifyDoctor(id_work_schedule: any, id_doctor: any): Observable<any> {
    return this.http.post<any>(`${linkApi}/${this.model}/specify-doctor`, {
      id_work_schedule,
      id_doctor,
    });
  }
}
