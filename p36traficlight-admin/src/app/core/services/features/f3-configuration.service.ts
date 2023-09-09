import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConstantsService } from 'src/app/core/utils/constants.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
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
  };

  /**
   * HttpClient API get() method => Fetch group apis list
   * @returns
   */
  get(filter = ''): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/configurations' + filter)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API post() method => Create any
   * @param data
   * @returns
   */
  add(data: any): Observable<any> {
    return this.http
      .post<any>(
        this.apiURL + '/configurations',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API post() method => Create any
   * @param data
   * @returns
   */
  deleteAndInsertMany(data: any): Observable<any> {
    return this.http
      .post<any>(
        this.apiURL + '/configurations/deleteAndInsertMany',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  /**
   * HttpClient API put() method => Update data
   * @param id
   * @param data
   * @returns
   */
  update(id: any, data: any): Observable<any> {
    return this.http
      .put<any>(
        this.apiURL + '/configurations/' + id,
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
      .delete<any>(this.apiURL + '/configurations/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API delete() method => Delete data
   * @param ids
   * @returns
   */
  deleteManyByIds(ids: any, idDevice: any) {
    return this.http
      .delete<any>(
        `${this.apiURL}/configurations/${ids}/ids?idDevice=${idDevice}`,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API get() method => Fetch tinhTp
   * @param id
   * @returns
   */
  find(id: any): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/configurations/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * HttpClient API get() method => paginate tinhTp with start page = 1 and limit
   * @param id
   * @returns
   */
  paginate(page: number, limit: number, filter: any): Observable<any> {
    let url =
      this.apiURL + '/configurations/paginate?page=' + page + '&limit=' + limit;

    // add condition filter
    if (filter != '') {
      url =
        this.apiURL +
        '/configurations/paginate?page=' +
        page +
        '&limit=' +
        limit +
        filter;
    }
    return this.http.get<any>(url).pipe(retry(1), catchError(this.handleError));
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
