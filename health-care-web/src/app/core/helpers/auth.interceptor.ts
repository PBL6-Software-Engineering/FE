import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';
// import { TokenStorageService } from '../services/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // private tokenService: TokenStorageService;
  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let authReq = request;
    // const token = this.tokenService.getToken();
    const token = this.tokenStorageService.getToken();
    if (token != null) {
      authReq = request.clone({
        headers: request.headers
          .set(TOKEN_HEADER_KEY, 'Bearer ' + token)
          .set('ngrok-skip-browser-warning', 'true'),
      });
    } else {
      authReq = request.clone({
        headers: request.headers.set('ngrok-skip-browser-warning', 'true'),
      });
    }

    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
