import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { linkApi } from '../../core/constants/api.constant';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  model = 'admin';
  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  getAllUser({
    search = '',
    page = 1,
    paginate = 20,
    role = '',
    is_accept = 'both',
    sortlatest = true,
  }): Observable<any> {
    return this.http.get<any>(
      `${linkApi}/${this.model}/all-user?search=${search}&page=${page}&paginate=${paginate}&role=${role}&is_accept=${is_accept}&sortlatest=${sortlatest}`
    );
  }

  changeAccept(id_user: any, is_accept: boolean): Observable<any> {
    return this.http.post<any>(
      `${linkApi}/${this.model}/change-accept/${id_user}`,
      {
        is_accept: is_accept,
      }
    );
  }

  changePassword(obj: any): Observable<any> {
    const role = this.tokenService.getRole();
    if (['manager', 'admin', 'supperadmin'].includes(role)) {
      return this.http.post<any>(
        `${linkApi}/${this.model}/change-password`,
        obj
      );
    } else if (role === 'hospital' || role === 'doctor') {
      return this.http.post<any>(`${linkApi}/user/change-password`, obj);
    } else {
      this.router.navigateByUrl('/');
      return new Observable<any>();
    }
  }

  updateProfile(obj: any): Observable<any> {
    const role = this.tokenService.getRole();
    const formData = new FormData();
    for (const key of Object.keys(obj)) {
      formData.append(key, obj[key]);
    }
    if (['manager', 'admin', 'supperadmin'].includes(role)) {
      return this.http.post<any>(`${linkApi}/${this.model}/update`, formData);
    } else if (role === 'hospital') {
      return this.http.post<any>(`${linkApi}/infor-hospital/update`, formData);
    } else if (role === 'doctor') {
      return this.http.post<any>(`${linkApi}/infor-doctor/update`, formData);
    } else {
      this.router.navigateByUrl('/');
      return new Observable<any>();
    }
  }

  getProfile(): Observable<any> {
    const role = this.tokenService.getRole();
    if (['manager', 'admin', 'supperadmin'].includes(role)) {
      return this.http.get<any>(`${linkApi}/${this.model}/profile`);
    } else if (role === 'hospital') {
      return this.http.get<any>(`${linkApi}/infor-hospital/profile`);
    } else if (role === 'doctor') {
      return this.http.get<any>(`${linkApi}/infor-doctor/profile`);
    } else {
      this.router.navigateByUrl('/');
      return new Observable<any>();
    }
  }
}
