import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { linkApi } from '../../core/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  model = 'department';
  constructor(private http: HttpClient) {}
  getDepartments(
    search = '',
    paginate = 6,
    page = 1,
    sortlatest = true,
  ): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}?search=${search}&paginate=${paginate}&page=${page}&sortlatest=${sortlatest}`,
    );
  }
}
