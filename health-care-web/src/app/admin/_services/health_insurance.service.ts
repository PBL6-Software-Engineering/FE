import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { linkApi } from '../../core/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class HealthInsuranceService {
  model = 'health-insurace';
  constructor(private http: HttpClient) {}

  getAllHealthInsurance({
    search = '',
    paginate = 20,
    page = 1,
    typesort = 'name',
    sortlatest = true,
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}?search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortlatest}`,
    );
  }

  create(obj: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', obj.name);
    formData.append('description', obj.description);
    return this.http.post<any>(`${linkApi}/${this.model}/add`, formData);
  }

  update(id: any, obj: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', obj.name);
    formData.append('description', obj.description);
    return this.http.post<any>(
      `${linkApi}/${this.model}/update/${id}`,
      formData,
    );
  }

  deleteById(id: any): Observable<any> {
    return this.http.delete<any>(`${linkApi}/${this.model}/delete/${id}`);
  }

  deleteMany(ids: any[]): Observable<any> {
    return this.http.delete<any>(`${linkApi}/${this.model}/deletes`, {
      body: { list_id: ids },
    });
  }

  // findById(id: any): Observable<any> {
  //   return this.http.get<any>(`${linkApi}/${this.model}/detail/${id}`);
  // }

  // deleteById(id: any): Observable<any> {
  //   return this.http.post<any>(
  //     `${linkApi}/${this.model}/change-confirm/${id}`,
  //     { is_confirm: 0 },
  //   );
  // }

  // getDoctors(filter: any): Observable<any> {
  //   const query = new URLSearchParams(filter);
  //   return this.http.get<any>(`${linkApi}/${this.model}/all-doctor?${query}`);
  // }

  // getDoctor(id_doctor: any): Observable<any> {
  //   return this.http.get<any>(`${linkApi}/${this.model}/doctor/${id_doctor}`);
  // }

  // addDoctor(obj: any): Observable<any> {
  //   return this.http.post<any>(`${linkApi}/${this.model}/add-doctor`, obj);
  // }

  // updateDoctor(id_doctor: any, obj: any): Observable<any> {
  //   return this.http.post<any>(
  //     `${linkApi}/${this.model}/update-infor-extend/${id_doctor}`,
  //     obj,
  //   );
  // }

  // changeConfirmDoctor(id_doctor: any, is_confirm: boolean): Observable<any> {
  //   return this.http.post<any>(
  //     `${linkApi}/${this.model}/change-confirm/${id_doctor}`,
  //     { is_confirm: is_confirm },
  //   );
  // }
}
