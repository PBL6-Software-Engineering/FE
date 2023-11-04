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
      `${linkApi}/${this.model}/all-doctor?search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortLatest}&is_confirm=1`
    );
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

  findById(id: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/detail/${id}`);
  }

  create(obj: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', obj.name);
    formData.append('description', obj.description);
    formData.append('thumbnail', obj.thumbnail, obj.thumbnail.name);
    return this.http.post<any>(`${linkApi}/${this.model}/add`, formData);
  }

  update(id: any, obj: any, isChangeFile: boolean = false): Observable<any> {
    const formData = new FormData();
    formData.append('name', obj.name);
    formData.append('description', obj.description);
    if (isChangeFile) {
      formData.append('thumbnail', obj.thumbnail, obj.thumbnail.name);
    }
    return this.http.post<any>(
      `${linkApi}/${this.model}/update/${id}`,
      formData
    );
  }

  deleteById(id: any): Observable<any> {
    return this.http.post<any>(
      `${linkApi}/${this.model}/change-confirm/${id}`,
      { is_confirm: 0 }
    );
  }

  deleteMany(ids: any[]): Observable<any> {
    return this.http.delete<any>(`${linkApi}/${this.model}/deletes`, {
      body: { list_id: ids },
    });
  }
}
