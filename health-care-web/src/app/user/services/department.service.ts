import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { linkApi } from 'src/app/core/constants/api.constant';
@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  model = 'department';
  constructor(private http: HttpClient) {}

  getDepartment(
    search = '',
    // paginate = "false",
    page = 1,
    sortlatest = true,
    sortname = false,
  ): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}?search=${search}&page=${page}&sortlatest=${sortlatest}&sortname=${sortname}`,
    );
  }
}
