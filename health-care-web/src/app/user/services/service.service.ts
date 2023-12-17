import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { linkApi } from 'src/app/core/constants/api.constant';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  model = 'hospital-service/all';
  constructor(private http: HttpClient) {}
  getService(
    search = '',
    paginate = 6,
    page = 1,
    sortlatest = true,
    sortname = false,
  ): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/?search=${search}&name_department=paginate=${paginate}&page=${page}&sortlatest=${sortlatest}&sortname=${sortname}`,
    );
  }
}
