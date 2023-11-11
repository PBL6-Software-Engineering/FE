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

  getAll({
    search= "",
    paginate= 20, 
    page= 1,
    typesort= "name", 
    sortlatest= true
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
