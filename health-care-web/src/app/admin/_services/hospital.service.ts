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

  getDoctors({
    page = 1,
    paginate = 20,
    search = '',
    sortLatest = true,
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/all-doctor?search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortLatest}&is_confirm=both&is_accept=both`
    );
  }

  getAll({
    search = '',
    paginate = 20,
    page = 1,
    typesort = 'name',
    sortlatest = true,
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/all-hospital?search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortlatest}`
    );
  }

  viewProfileHospital(id: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/view-profile/${id}`);
  }

  getThreeHospitals({
    search = '',
    page = 1,
    paginate = 3,
    sort_search_number = true,
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/all-hospital?search=${search}&page=${page}&paginate=${paginate}&sort_search_number=${sort_search_number}`
    );
  }

  getHospitalService(id_hospital: any): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/hospital-service/hospital/${id_hospital}`
    );
  }

  getDoctorsOfHospital(id_hospital: any): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/doctors-home/${id_hospital}`
    );
  }

  getDoctorOfHospital(id_doctor: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/doctor/${id_doctor}`);
  }

  changeConfirmDoctor(id_doctor: any, is_confirm: boolean): Observable<any> {
    return this.http.post<any>(
      `${linkApi}/${this.model}/change-confirm/${id_doctor}`,
      { is_confirm: is_confirm }
    );
  }

  addDoctor(obj: any): Observable<any> {
    return this.http.post<any>(`${linkApi}/${this.model}/add-doctor`, obj);
  }

  updateDoctor(id_doctor: any, obj: any): Observable<any> {
    return this.http.post<any>(
      `${linkApi}/${this.model}/update-infor-extend/${id_doctor}`,
      obj
    );
  }

  findById(id: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/detail/${id}`);
  }

  deleteById(id: any): Observable<any> {
    return this.http.post<any>(
      `${linkApi}/${this.model}/change-confirm/${id}`,
      { is_confirm: 0 }
    );
  }
}
