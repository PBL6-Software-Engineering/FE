import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { linkApi } from '../../core/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  model = 'article';
  constructor(private http: HttpClient) {}

  getArticles(query: any): Observable<any> {
    const httpPatams = new HttpParams({ fromObject: query });
    return this.http.get<any>(`${linkApi}/${this.model}?${httpPatams}`);
  }

  findById(id: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/detail/${id}`);
  }
}
