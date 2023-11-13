import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { prefixApi } from 'src/app/core/constants/api.constant';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private $isLogin = new BehaviorSubject(this.hasToken());
  private $user = new BehaviorSubject(localStorage.getItem('user'));
  isLogin = this.$isLogin.asObservable();
  user = this.$user.asObservable();

  constructor() {}

  saveToken(token: any, role: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    this.$isLogin.next(true);
  }

  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.$isLogin.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin;
  }

  isAdmin(): any {
    return ['manager', 'hospital', 'doctor'].includes(
      localStorage.getItem('role') || ''
    );
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  saveUser(user: any): void {
    if(user.avatar && user.avatar.indexOf('http') === -1) {
      user.avatar = `${prefixApi}/${user.avatar}`;
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.$user.next(user);
  }

  getUser(): any {
    return this.user;
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  getRole(): any {
    return localStorage.getItem('role');
  }
}
