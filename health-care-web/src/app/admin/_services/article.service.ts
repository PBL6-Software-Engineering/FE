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

  paginate({
    page = 1,
    paginate = 20,
    search = '',
    sortLatest = true,
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/hospital?role=hospital&search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortLatest}`
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
      `${linkApi}/${this.model}?&search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortLatest}&sort_search_number=${sort_search_number}`
    );
  }

  getArticleByCategory({
    page = 1,
    paginate = 3,
    name_category = '',
    sort_search_number = true,
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}?page=${page}&paginate=${paginate}&name_category=${name_category}&sort_search_number=${sort_search_number}`
    );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/hospital?role=hospital`
    );
  }

  findById(id: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/detail/${id}`);
  }

  create(obj: any): Observable<any> {
    const formData = new FormData();
    formData.append('title', obj.title);
    formData.append('id_category', obj.id_category);
    formData.append('content', obj.content);
    formData.append('thumbnail', obj.thumbnail, obj.thumbnail.name);
    return this.http.post<any>(`${linkApi}/${this.model}/add`, formData);
  }

  update(id: any, obj: any, isChangeFile: boolean = false): Observable<any> {
    const formData = new FormData();
    formData.append('title', obj.title);
    formData.append('id_category', obj.id_category);
    formData.append('content', obj.content);
    if (isChangeFile) {
      formData.append('thumbnail', obj.thumbnail, obj.thumbnail.name);
    }
    return this.http.post<any>(
      `${linkApi}/${this.model}/update/${id}`,
      formData
    );
  }

  deleteById(id: any): Observable<any> {
    return this.http.delete<any>(`${linkApi}/${this.model}/delete/${id}`);
  }

  deleteMany(ids: any[]): Observable<any> {
    return this.http.delete<any>(`${linkApi}/${this.model}/deletes`, {
      body: { list_id: ids },
    });
  }
}
