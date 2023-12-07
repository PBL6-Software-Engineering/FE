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

  findById(id: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/detail/${id}`);
  }

  deleteById(id: any): Observable<any> {
    return this.http.post<any>(
      `${linkApi}/${this.model}/change-confirm/${id}`,
      { is_confirm: 0 },
    );
  }

  getDoctors(filter: any): Observable<any> {
    const query = new URLSearchParams(filter);
    return this.http.get<any>(`${linkApi}/${this.model}/all-doctor?${query}`);
  }

  getDoctor(id_doctor: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/doctor/${id_doctor}`);
  }

  addDoctor(obj: any): Observable<any> {
    return this.http.post<any>(`${linkApi}/${this.model}/add-doctor`, obj);
  }

  updateDoctor(id_doctor: any, obj: any): Observable<any> {
    return this.http.post<any>(
      `${linkApi}/${this.model}/update-infor-extend/${id_doctor}`,
      obj,
    );
  }

  changeConfirmDoctor(id_doctor: any, is_confirm: boolean): Observable<any> {
    return this.http.post<any>(
      `${linkApi}/${this.model}/change-confirm/${id_doctor}`,
      { is_confirm: is_confirm },
    );
  }
}
