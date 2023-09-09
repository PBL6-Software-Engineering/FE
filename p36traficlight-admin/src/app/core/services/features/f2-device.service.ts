import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConstantsService } from '../../utils/constants.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  // Define API
  apiURL = ConstantsService.api.frontEnd;

  constructor(private http: HttpClient) {}

  /*========================================
    Begin CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  /**
   * HttpClient API get() method => Fetch devices belong to groups
   * @returns
   */
  findByGroup(): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/devices/findByGroup')
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API get() method => Fetch devices belong to group by id group
   * @param id
   * @returns
   */
  findGroupById(id: any): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/devices/findByGroup/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API get() method => Find device by deviceCode
   * @param deviceCode
   * @returns
   */
  findByDeviceCode(deviceCode: any): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/devices/findByDeviceCode/' + deviceCode)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API get() method => Find device by deviceCode
   * @param id
   * @param isLock
   * @returns
   */
  changeStatusLock(id: any, isLock: boolean): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/devices/changeStatusLock/' + id + '/' + isLock)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API get() method => Fetch group apis list
   * @returns
   */
  get(query = ''): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/devices' + query)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API post() method => Create any
   * @param data
   * @param query
   * @returns
   */
  add(data: any, query = ''): Observable<any> {
    return this.http
      .post<any>(
        this.apiURL + '/devices' + query,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API put() method => Update data
   * @param id
   * @param data
   * @param query
   * @returns
   */
  update(id: any, data: any, query=''): Observable<any> {
    return this.http
      .put<any>(
        this.apiURL + '/devices/' + id + query,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API delete() method => Delete data
   * @param id
   * @returns
   */
  delete(id: any) {
    return this.http
      .delete<any>(this.apiURL + '/devices/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API delete() method => Delete data
   * @param ids
   * @returns
   */
  deleteManyByIds(ids: any) {
    return this.http
      .delete<any>(
        `${this.apiURL}/devices/${ids}/ids`,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * deleteDeviceInGroup
   * @param idGroup
   * @param idDevice
   */
  deleteDeviceInGroup(idGroup: any, idDevice: any) {
    return this.http
      .delete<any>(
        `${this.apiURL}/devices/deleteDeviceInGroup?idGroup=${idGroup}&idDevice=${idDevice}`,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }


  /**
   * updateChildGroup
   * @param idsGroup
   * @param idsDevice
   */
  updateChildGroup(idsGroup: string, idsDevice: string) {
    return this.http
      .post<any>(
        `${this.apiURL}/devices/updateChildGroup`,
        { idsGroup, idsDevice },
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API get() method => Fetch device by id
   * @param id
   * @returns
   */
  find(id: any, filter=''): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/devices/' + id + filter)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API get() method => Fetch devices
   * @param page
   * @param limit
   * @param filter
   */
  paginate(page: number, limit: number, filter: any): Observable<any> {
    let url =
      this.apiURL + '/devices/paginate?page=' + page + '&limit=' + limit;

    // add condition filter
    if (filter != '') {
      url =
        this.apiURL +
        '/devices/paginate?page=' +
        page +
        '&limit=' +
        limit +
        filter;
    }
    return this.http.get<any>(url).pipe(retry(1), catchError(this.handleError));
  }

  /**
   * sendAndReceiveData
   * @param data
   */
  sendAndReceiveData(data: any) {
    return this.http
      .post<any>(
        this.apiURL + '/devices/sendAndReceiveData',
        data,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  /*========================================
    Begin Custom Methods for RESTful API
  =========================================*/

  /**
   * Error handling
   * @param error
   * @returns
   */
  handleError(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    // log error when call api
    console.log(
      'ERROR: API: ',
      error.url,
      ' Status:',
      error?.status,
      error?.error?.errors[0]
    );

    return throwError(error);
  }
}
