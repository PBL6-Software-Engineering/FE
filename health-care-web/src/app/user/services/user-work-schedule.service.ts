import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { linkApi } from 'src/app/core/constants/api.constant';
@Injectable({
  providedIn: 'root',
})
export class UserWorkScheduleService {
  model = 'work-schedule';
  constructor(private http: HttpClient) {}

  getWorkSchedule({
    search = '',
    paginate = 6,
    page = 1,
    is_service = '', // 'advise' OR 'service' OR ''
    typesort = 'time', // new , name , price , time
    sortlatest = true, // true , false
    start_date = '',
    end_date = '',
    is_confirm = 'both',
    status = '', // '' OR complete OR upcoming .
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/user?search=${search}&page=${page}&paginate=${paginate}&sortlatest=${sortlatest}&is_service=${is_service}&typesort=${typesort}&start_date=${start_date}&end_date=${end_date}&status=${status}&is_confirm=${is_confirm}`,
    );
  }

  deleteWorkSchedule(id = ''): Observable<any> {
    return this.http.delete<any>(`${linkApi}/${this.model}/user-cancel/${id}`);
  }

  deleteManyWorkSchedule(ids: Number[] = []): Observable<any> {
    return this.http.delete<any>(`${linkApi}/${this.model}/user-cancel-many`, {
      body: { list_id: ids },
    });
  }
}
