import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { linkApi } from '../../core/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  model = 'article';
  constructor(private http: HttpClient) {}

  getArticles({
    page = 1,
    paginate = 20,
    search = '',
    sortLatest = true,
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}?search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortLatest}`,
    );
  }

  getArticleOutStandingPublic({
    page = 1,
    paginate = 20,
    search = '',
    sortLatest = true,
    sort_search_number = true,
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}?&search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortLatest}&sort_search_number=${sort_search_number}`,
    );
  }

  getArticleByCategory({
    page = 1,
    paginate = 3,
    name_category = '',
    sort_search_number = true,
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}?page=${page}&paginate=${paginate}&name_category=${name_category}&sort_search_number=${sort_search_number}`,
    );
  }

  findById(id: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/detail/${id}`);
  }
}
