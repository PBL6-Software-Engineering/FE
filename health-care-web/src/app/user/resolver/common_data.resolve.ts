import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class CommonDataResolve implements Resolve<any> {
  constructor(private commonService: CommonService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    return forkJoin([
      this.commonService.getProvinces(),
      this.commonService.getCategories(),
      this.commonService.getDepartments(),
    ]);
  }
}
