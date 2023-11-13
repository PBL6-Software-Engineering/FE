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
import { prefixApi } from '../constants/api.constant';

@Injectable()
export class PreprocessResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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
            if (event.body.data && event.body.data.data) {
              processImageOfArray(event.body.data.data);
            } else if (event.body.data && Array.isArray(event.body.data)) {
              processImageOfArray(event.body.data);
            } else if (event.body.data) {
              processImageOfObject(event.body.data);
            }
          }
        },
        (error: HttpErrorResponse) => {
          throw error;
        }
      )
    );
  }
}

export const preprocessResponseProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: PreprocessResponseInterceptor,
    multi: true,
  },
];

function processImageOfArray(array: any[]) {
  array.forEach((item: any) => {
    if (item.avatar && item.avatar.indexOf('http') === -1) {
      item.avatar = prefixApi + '/' + item.avatar;
    }

    if (item.doctor_avatar && item.doctor_avatar.indexOf('http') === -1) {
      item.doctor_avatar = prefixApi + '/' + item.doctor_avatar;
    }

    if (item.user_avatar && item.user_avatar.indexOf('http') === -1) {
      item.user_avatar = prefixApi + '/' + item.user_avatar;
    }

    if (item.hospital_avatar && item.hospital_avatar.indexOf('http') === -1) {
      item.hospital_avatar = prefixApi + '/' + item.hospital_avatar;
    }

    if (item.thumbnail && item.thumbnail.indexOf('http') === -1) {
      item.thumbnail = prefixApi + '/' + item.thumbnail;
    }

    if (
      item.thumbnail_article &&
      item.thumbnail_article.indexOf('http') === -1
    ) {
      item.thumbnail_article = prefixApi + '/' + item.thumbnail_article;
    }

    if (
      item.thumbnail_department &&
      item.thumbnail_department.indexOf('http') === -1
    ) {
      item.thumbnail_department = prefixApi + '/' + item.thumbnail_department;
    }

    if (item.avatar_user && item.avatar_user.indexOf('http') === -1) {
      item.avatar_user = prefixApi + '/' + item.avatar_user;
    }
  });
}

function processImageOfObject(item: any) {
  if (item.avatar && item.avatar.indexOf('http') === -1) {
    item.avatar = prefixApi + '/' + item.avatar;
  }

  if (item.doctor_avatar && item.doctor_avatar.indexOf('http') === -1) {
    item.doctor_avatar = prefixApi + '/' + item.doctor_avatar;
  }

  if (item.user_avatar && item.user_avatar.indexOf('http') === -1) {
    item.user_avatar = prefixApi + '/' + item.user_avatar;
  }

  if (item.hospital_avatar && item.hospital_avatar.indexOf('http') === -1) {
    item.hospital_avatar = prefixApi + '/' + item.hospital_avatar;
  }

  if (item.thumbnail && item.thumbnail.indexOf('http') === -1) {
    item.thumbnail = prefixApi + '/' + item.thumbnail;
  }

  if (item.thumbnail_article && item.thumbnail_article.indexOf('http') === -1) {
    item.thumbnail_article = prefixApi + '/' + item.thumbnail_article;
  }

  if (
    item.thumbnail_department &&
    item.thumbnail_department.indexOf('http') === -1
  ) {
    item.thumbnail_department = prefixApi + '/' + item.thumbnail_department;
  }

  if (item.avatar_user && item.avatar_user.indexOf('http') === -1) {
    item.avatar_user = prefixApi + '/' + item.avatar_user;
  }
}
