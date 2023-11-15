import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class HttpSpinnerInterceptor implements HttpInterceptor {
  isActiveSpinner = false;
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.requestStarted();
    return this.handler(next, request);
  }

  handler(
    next: HttpHandler,
    request: HttpRequest<any>
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.requestEnded();
          }
        },
        (error: HttpErrorResponse) => {
          this.spinnerService.resetSpinner();
          throw error;
        }
      )
    );
  }
}

export const spinnerInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpSpinnerInterceptor, multi: true },
];
