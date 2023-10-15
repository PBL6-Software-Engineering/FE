import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { linkApi } from '../../core/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  model = 'category';
  constructor(private http: HttpClient) {}

  paginate({
    page = 1,
    paginate = 20,
    search = '',
    sortLastest = true,
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}?page=${page}&search=${search}&paginate=${paginate}&sortlastest=${sortLastest}`
    );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}`);
  }

  findById(id: any): Observable<any> {
    return this.http.get<any>(`${linkApi}/${this.model}/detail/${id}`);
  }

  create(obj: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', obj.name);
    formData.append('thumbnail', obj.thumbnail, obj.thumbnail.name);
    return this.http.post<any>(`${linkApi}/${this.model}/add`, formData);
  }

  update(obj: any, isChangeFile: boolean = false): Observable<any> {
    const formData = new FormData();
    formData.append('name', obj.name);
    if (isChangeFile) {
      formData.append('thumbnail', obj.thumbnail, obj.thumbnail.name);
    }
    return this.http.post<any>(
      `${linkApi}/${this.model}/update/${obj.id}`,
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
