import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { CommonObj } from '../../model/common-obj';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if(window.innerWidth > 992) {
      this.isOpenSubMenuBarMobile = false;
    }
    if(window.innerWidth < 992) {
      this.isOpenSubMenuBar = false;
    }
  }

  tabObj: any = {};
  categories: any[] = [];
  isLogin: boolean = false;
  isOpenSubMenuBar: boolean = false;
  isOpenSubMenuBarMobile: boolean = false;
  isOpenHeaderInfo: boolean = false;

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    // this.chooseTab();
  }

  chooseTab(tab: string = "CATEGORY") {
    this.tabObj.tab = tab;
    this.isOpenSubMenuBar = true;
    this.isOpenSubMenuBarMobile = this.isOpenHeaderInfo = false;
    if(tab === 'CATEGORY') {
      this.tabObj.items = this.categories;
      this.tabObj.title = 'Chuyên mục sức khoẻ';
    } else if(tab === 'HEALTH_CHECK') {
      this.tabObj.items = this.categories;
      this.tabObj.title = 'Công cụ sức khoẻ';
    } else if(tab === 'BOOKING_DOCTOR') {
      this.tabObj.items = this.categories;
      this.tabObj.title = 'Các chuyên khoa';
    } else if(tab === 'SOCIAL') {
      this.tabObj.items = this.categories;
      this.tabObj.title = 'Cộng đồng';
    }
  }

  openSubMenuBarMobile(): void {

  }

  login(): void {
    this.isLogin = true;
  }

  logout(): void {
    this.isLogin = false;
    this.isOpenHeaderInfo = false;
  }

  clickSubMenuBarMobile(): void {
    this.isOpenSubMenuBarMobile = !this.isOpenSubMenuBarMobile;
    this.isOpenSubMenuBar = this.isOpenHeaderInfo = false;
  }

  clickAvatarUser(): void {
    this.isOpenHeaderInfo = !this.isOpenHeaderInfo;
    this.isOpenSubMenuBar = this.isOpenSubMenuBarMobile = false;
  }
}
