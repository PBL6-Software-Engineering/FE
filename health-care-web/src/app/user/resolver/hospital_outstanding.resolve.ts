import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, retry } from 'rxjs';
import { HospitalService } from 'src/app/admin/_services/hospital.service';

@Injectable({
  providedIn: 'root',
})
export class ThreeHospitalOutstandingResolve implements Resolve<any> {
  constructor(private hospitalService: HospitalService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    return this.hospitalService.getThreeHospitals({});
  }
}
