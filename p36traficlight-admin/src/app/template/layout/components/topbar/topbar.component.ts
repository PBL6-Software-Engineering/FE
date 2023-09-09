import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { UserService } from 'src/app/core/services/features/user.service';
import { LayoutService } from '../../core/layout.service';
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  // subscription
  subscription: Subscription[] = [];

  user: any;

  numberNotify = 0;
  /**
   * constructor
   * @param userService
   * @param commonService
   */
  constructor(
    private commonService: CommonService,
    private userService: UserService,
    private layout: LayoutService,
    private firebase: AngularFireDatabase,
  ) {
    // load data user
    this.onLoadData();
  }

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
    this.firebase.object('warnings/63e46cefa81b3c77b5b0547e').valueChanges()
      .subscribe((data: any) => {
        if (data) {
          this.numberNotify = data.numberNotify;
        }
      });
  }
  /**
   * Load data
   */
  onLoadData() {
    this.getProfile();
  }

  /**
   * Get profile
   */
  getProfile() {
    this.subscription.push(
      this.userService
        .getMe({ populate: '', fields: 'fullName,avatar' })
        .subscribe((data) => {
          // add default image if avatar empty
          if (data.avatar == '') {
            data.avatar = 'assets/noimage.jpeg';
          }

          this.user = data;
        })
    );
  }

  /**
   * ngOnDestroy
   */
  ngOnDestroy() {
    this.subscription.forEach((item) => {
      item.unsubscribe();
    });
  }

  resetNumberNotify() {
    this.firebase.object('warnings/63e46cefa81b3c77b5b0547e').update({
      numberNotify: 0
    });
  }
}
