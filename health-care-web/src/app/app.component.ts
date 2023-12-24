// import {
//   SocialAuthService,
//   FacebookLoginProvider,
//   SocialUser,
//   GoogleLoginProvider,
// } from '@abacritt/angularx-social-login';

import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // template or styles
})
export class AppComponent implements OnInit {
  title = 'health-care-web';

  // socialUser!: SocialUser;
  isLoggedin?: boolean = undefined;

  isLoader: boolean;

  constructor(
    private router: Router,
    // private socialAuthService: SocialAuthService,
  ) {}

  // ngOnInit() {
  //   this.routerEvents();
  // }

  routerEvents() {
    this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoader = true;
          break;
        }
        case event instanceof NavigationEnd: {
          this.isLoader = false;
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.routerEvents();

    // this.socialAuthService.authState.subscribe((user) => {
    //   this.socialUser = user;
    //   this.isLoggedin = user != null;
    // });
  }

  // loginWithFacebook(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
  // loginWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
  // signOut(): void {
  //   this.socialAuthService.signOut();
  // }
}
