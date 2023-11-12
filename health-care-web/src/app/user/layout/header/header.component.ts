import { Component, HostListener, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth > 992) {
      this.isOpenSubMenuBarMobile = false;
    }
    if (window.innerWidth < 992) {
      this.isOpenSubMenuBar = false;
    }
  }

  tabObj: any = {};
  categories: any[] = [];
  departments: any[] = [];
  isOpenSubMenuBar: boolean = false;
  isOpenSubMenuBarMobile: boolean = false;
  isOpenHeaderInfo: boolean = false;
  isLogin: any;
  user: any;

  textSearch: string = '';

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.chooseTab();
    this.tokenStorageService.isLogin.subscribe(
      (isLogin) => (this.isLogin = isLogin)
    );
    this.tokenStorageService
      .getUser()
      .subscribe((user: any) => (this.user = JSON.parse(user)));

    const categoriesStorage = localStorage.getItem('categories');
    if (categoriesStorage) {
      this.categories = JSON.parse(categoriesStorage);
    }

    const departmentsStorage = localStorage.getItem('departments');
    if (departmentsStorage) {
      this.departments = JSON.parse(departmentsStorage);
    }
  }

  chooseTab(tab: string = 'CATEGORY') {
    this.tabObj.tab = tab;
    this.isOpenSubMenuBar = true;
    this.isOpenSubMenuBarMobile = this.isOpenHeaderInfo = false;
    if (tab === 'CATEGORY') {
      this.tabObj.title = 'Chuyên mục sức khoẻ';
      this.tabObj.items = this.categories;
    } else if (tab === 'BOOKING_DOCTOR') {
      this.tabObj.items = this.departments;
      this.tabObj.title = 'Các chuyên khoa';
    } else if (tab === 'SOCIAL') {
      this.tabObj.items = this.categories;
      this.tabObj.title = 'Cộng đồng';
    }
  }

  openSubMenuBarMobile(): void {}

  login(): void {
    this.isLogin = true;
  }

  clickSubMenuBarMobile(): void {
    this.isOpenSubMenuBarMobile = !this.isOpenSubMenuBarMobile;
    this.isOpenSubMenuBar = this.isOpenHeaderInfo = false;
  }

  clickAvatarUser(): void {
    this.isOpenHeaderInfo = !this.isOpenHeaderInfo;
    this.isOpenSubMenuBar = this.isOpenSubMenuBarMobile = false;
  }

  searchArticle(): void {
    this.router.navigate(['/bai-viet/tim-kiem', this.textSearch || '']);
  }
}
