import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { linkApi } from '../../core/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  model = 'admin';
  constructor(private http: HttpClient) {}

  getAllUser({
    search = '',
    page = 1,
    paginate = 20,
    role = '',
    is_accept = 'both',
    sortlatest = true
  }): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/all-user?search=${search}&page=${page}&paginate=${paginate}&role=${role}&is_accept=${is_accept}&sortlatest=${sortlatest}`);
  }

  changeAccept(id_user: any, is_accept: boolean): Observable<any> {
    return this.http.post<any>(
      `${linkApi}/${this.model}/change-accept/${id_user}`,
      {
        is_accept: is_accept,
      }
    );
  }
}
