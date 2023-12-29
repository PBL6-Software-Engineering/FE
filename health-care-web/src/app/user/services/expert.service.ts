import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { linkApi } from 'src/app/core/constants/api.constant';
@Injectable({
  providedIn: 'root',
})
export class ExpertService {
  model = 'infor-hospital';
  constructor(private http: HttpClient) {}
  getDoctor(
    search = '',
    page = 1,
    paginate = 6,
    name_department = '',
    sortlatest = true,
    sortname = false,
  ): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/all-doctor-care?search=${search}&paginate=${paginate}&page=${page}&name_department=${name_department}&sortlatest=${sortlatest}&sortname=${sortname}`,
    );
  }
  getDoctorById(id = 0): Observable<any> {
    return this.http.get<any>(`${linkApi}/infor-doctor/view-profile/${id}`);
  }
}
