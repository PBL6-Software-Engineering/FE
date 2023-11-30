import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { linkApi } from '../../core/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  model = 'infor-hospital';
  constructor(private http: HttpClient) {}

  paginate({
    search = '',
    paginate = 20,
    page = 1,
    typesort = 'name',
    sortlatest = true,
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/all-hospital?search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortlatest}`,
    );
  }

  viewProfileHospital(id: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/view-profile/${id}`);
  }

  getHospitalService(id_hospital: any): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/hospital-service/hospital/${id_hospital}`,
    );
  }

  getDoctorsOfHospital(id_hospital: any): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/doctors-home/${id_hospital}`,
    );
  }

  getDoctor(id_doctor: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/doctor/${id_doctor}`);
  }
}
