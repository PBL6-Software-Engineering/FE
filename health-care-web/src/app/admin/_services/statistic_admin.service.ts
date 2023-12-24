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

  getDashboardOverview(obj: any): Observable<any> {
    const query = new URLSearchParams(obj).toString();
    return this.httpClient.get(`${linkApi}/${model}/overview?${query}`);
  }

  getStatisticByTop(top = 5, type: any): Observable<any> {
    return this.httpClient.get(
      `${linkApi}/${model}/top?top=${top}&type=${type}`,
    );
  }

  getStatisticAppointmentService(obj: any): Observable<any> {
    const query = new URLSearchParams(obj).toString();
    return this.httpClient.get(`${linkApi}/${model}/service-table?${query}`);
  }

  getStatisticAppointmentAdvise(obj: any): Observable<any> {
    const query = new URLSearchParams(obj).toString();
    return this.httpClient.get(`${linkApi}/${model}/advise-table?${query}`);
  }
}
