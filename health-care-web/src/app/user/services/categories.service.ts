import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { linkApi } from 'src/app/core/constants/api.constant';
@Injectable({
  providedIn: 'root',
})
export class categoriesService {
  model = 'category';
  constructor(private http: HttpClient) {}

  getCategories(
    search = '',
    paginate = 20,
    page = 1,
    sortlatest = true,
    sortname = true,
  ): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}?search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortlatest}&sortname=${sortname}`,
    );
  }
}
