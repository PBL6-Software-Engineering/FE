import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { helps, categoris } from './data';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getHelps(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      observer.next(helps);
    });
  }

  getCategoris(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      observer.next(categoris);
    });
  }
}
