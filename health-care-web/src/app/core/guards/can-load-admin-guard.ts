import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanLoadAdminGuard implements CanLoad {
  isAdmin = true;
  constructor(private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // check admin
    if (this.isAdmin) {
      return true;
    }
    this.router.navigate(['/auth/admin']);
    return false;
  }
}
