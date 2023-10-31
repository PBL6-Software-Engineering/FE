import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { DepartmentService } from 'src/app/admin/_services/department.service';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentResolve implements Resolve<any> {
  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.departmentService.getAll();
  }
}
