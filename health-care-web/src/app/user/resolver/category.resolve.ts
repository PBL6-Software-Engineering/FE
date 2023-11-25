import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { CategoryService } from 'src/app/admin/_services/category.service';
import { Observable, retry, switchMap } from 'rxjs';
import { take } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolve implements Resolve<any> {
  constructor(private categoryService: CategoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    return this.categoryService.getAll();
  }
}
