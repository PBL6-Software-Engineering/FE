import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';

@Injectable({
  providedIn: 'root',
})
export class CanLoadAdminGuard implements CanLoad {
  isAdmin = false;
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[],
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // check admin
    if (this.tokenStorageService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/auth/sign-in/admin']);
    return false;
  }
}
