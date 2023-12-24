import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { linkApi } from 'src/app/core/constants/api.constant';

const model = 'statistical';
@Injectable({
  providedIn: 'root',
})
export class StatisticAdminService {
  constructor(private httpClient: HttpClient) {}

  getAccountStatistic(): Observable<any> {
    return this.httpClient.get(`${linkApi}/${model}/user`);
  }

  getArticleStatistic(): Observable<any> {
    return this.httpClient.get(`${linkApi}/${model}/article`);
  }
}
