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
    name_department = '',
    paginate = 6,
    page = 1,
    sortlatest = true,
    sortname = false
  ): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/all-doctor-care?search=${search}&name_department=${name_department}&paginate=${paginate}&page=${page}&sortlatest=${sortlatest}&sortname=${sortname}`
    );
  }
  getDoctorById(id = 0): Observable<any> {
    return this.http.get<any>(`${linkApi}/infor-doctor/view-profile/${id}`);
  }
}
