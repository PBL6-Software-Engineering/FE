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
    role = '',
  }): Observable<any> {
    if (['manager', 'admin', 'superadmin'].includes(role)) {
      return this.http.get<any>(
        `${linkApi}/${this.model}/admin?search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortLatest}`,
      );
    } else if (role === 'hospital') {
      return this.http.get<any>(
        `${linkApi}/${this.model}/hospital?search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortLatest}`,
      );
    } else if (role === 'doctor') {
      return this.http.get<any>(
        `${linkApi}/${this.model}/doctor?search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortLatest}`,
      );
    } else {
      return this.http.get<any>(
        `${linkApi}/${this.model}?search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortLatest}`,
      );
    }
  }

  changeAccept(id_article: any, is_accept: boolean): Observable<any> {
    return this.http.post<any>(
      `${linkApi}/${this.model}/change-accept/${id_article}`,
      {
        is_accept: is_accept,
      },
    );
  }

  changeShow(id_article: any, is_show: boolean): Observable<any> {
    return this.http.post<any>(
      `${linkApi}/${this.model}/hide-show/${id_article}`,
      {
        is_show: is_show,
      },
    );
  }

  findById(id: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/detail-private/${id}`);
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
      formData,
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
