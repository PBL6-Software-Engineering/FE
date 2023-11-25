import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { linkApi } from '../../core/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class ServiceHospitalService {
  model = 'hospital-service';
  constructor(private http: HttpClient) {}

  paginate({
    page = 1,
    paginate = 20,
    search = '',
    sortLatest = true,
    id_hospital = '',
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/hospital/${id_hospital}?search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortLatest}`,
    );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}`);
  }

  findById(id: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/detail/${id}`);
  }

  create(obj: any): Observable<any> {
    return this.http.post<any>(`${linkApi}/${this.model}/add`, obj);
  }

  update(id: any, obj: any): Observable<any> {
    return this.http.post<any>(`${linkApi}/${this.model}/update/${id}`, obj);
  }

  deleteById(id: any): Observable<any> {
    return this.http.delete<any>(`${linkApi}/${this.model}/${id}`);
  }

  deleteMany(ids: any[]): Observable<any> {
    return this.http.delete<any>(`${linkApi}/${this.model}/deletes`, {
      body: { list_id: ids },
    });
  }
}
