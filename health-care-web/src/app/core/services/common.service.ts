import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { linkApi } from '../constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private readonly data = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any> {
    const cacheKey = `${linkApi}/province`;
    if (this.data.get(cacheKey)) {
      return this.data.get(cacheKey)!;
    }
    return this.callAPI(cacheKey);
  }

  getCategories(): Observable<any> {
    const cacheKey = `${linkApi}/category`;
    if (this.data.get(cacheKey)) {
      return this.data.get(cacheKey)!;
    }
    return this.callAPI(cacheKey);
  }

  getDepartments(): Observable<any> {
    const cacheKey = `${linkApi}/department`;
    if (this.data.get(cacheKey)) {
      return this.data.get(cacheKey)!;
    }
    return this.callAPI(cacheKey);
  }

  callAPI(cacheKey: string) {
    return this.http
      .get<any>(cacheKey)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
}
