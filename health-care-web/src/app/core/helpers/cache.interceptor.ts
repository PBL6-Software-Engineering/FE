import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from '../services/http-cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cacheService: HttpCacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // method PUT, POST, DELETE => don't save cache because data is changed
    if (req.method !== 'GET') {
      this.cacheService.invalidateCache();
      return next.handle(req);
    }

    if (req.headers.get('reset')) {
      this.cacheService.delete(req.url);
    }

    // attempt to retrieve a cached response
    const cachedResponse: HttpResponse<any> | any = this.cacheService.get(
      req.url,
    );

    // reponse data in cache
    if (cachedResponse) {
      return of(cachedResponse);
    }

    // send request to server and add response to cache
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cacheService.put(req.url, event);
        }
      }),
    );
  }
}
