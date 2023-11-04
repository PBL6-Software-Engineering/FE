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
import { CommonService } from 'src/app/core/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class ProvinceResolve implements Resolve<any> {
  constructor(private commonService: CommonService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.commonService.getProvinces();
  }
}
