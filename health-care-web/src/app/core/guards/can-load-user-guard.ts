import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { TokenRegex } from 'flatpickr/dist/utils/formatting';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';

@Injectable({
  providedIn: 'root', // you can change to any level if needed
})
export class CanLoadUserGuard implements CanActivate {
  constructor(
    private tokenStorageService: TokenStorageService,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.tokenStorageService.isUser()) {
      return false;
    }
    return true; // replace with actual logic
  }
}
