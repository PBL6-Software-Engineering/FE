import { Component, HostListener, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HospitalService } from '../../services/hospital.service';
import { ArticleService } from '../../services/article.service';

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
  hospitals: any[] = [];
  articles: any[] = [];

  isOpenSubMenuBar: boolean = false;
  isOpenSubMenuBarMobile: boolean = false;
  isOpenHeaderInfo: boolean = false;
  isOpenConversation: boolean = false;
  isLogin: any;
  user: any;

  textSearch: string = '';

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private articleService: ArticleService,
    private hospitalService: HospitalService,
  ) {}

  ngOnInit(): void {
    this.tokenStorageService.isLogin.subscribe(
      (isLogin) => (this.isLogin = isLogin),
    );
    this.tokenStorageService.getUser().subscribe((user: any) => {
      this.user = user || {};
      this.isLogin = user.id ? true : false;
    });

    const categoriesStorage = localStorage.getItem('categories');
    if (categoriesStorage) {
      this.categories = JSON.parse(categoriesStorage);
    }

    const departmentsStorage = localStorage.getItem('departments');
    if (departmentsStorage) {
      this.departments = JSON.parse(departmentsStorage);
    }

    forkJoin([
      this.articleService.getArticles({ paginate: 3, page: 1 }),
      this.hospitalService.paginate({ paginate: 3, page: 1 }),
    ]).subscribe(([article, hospital]) => {
      this.articles = article.data?.data;
      this.hospitals = hospital.data?.data;
    });
  }

  chooseTab(tab: string = 'CATEGORY') {
    this.tabObj.tab = tab;
    this.isOpenSubMenuBar = true;
    this.isOpenSubMenuBarMobile =
      this.isOpenHeaderInfo =
      this.isOpenConversation =
        false;
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

  login(): void {
    this.isLogin = true;
  }

  clickSubMenuBarMobile(): void {
    this.isOpenSubMenuBarMobile = !this.isOpenSubMenuBarMobile;
    this.isOpenSubMenuBar =
      this.isOpenHeaderInfo =
      this.isOpenConversation =
        false;
  }

  clickAvatarUser(): void {
    this.isOpenHeaderInfo = !this.isOpenHeaderInfo;
    this.isOpenSubMenuBar =
      this.isOpenSubMenuBarMobile =
      this.isOpenConversation =
        false;
  }

  viewConversation(): void {
    this.isOpenConversation = !this.isOpenConversation;
    this.isOpenSubMenuBar =
      this.isOpenSubMenuBarMobile =
      this.isOpenHeaderInfo =
        false;
  }

  searchArticle(): void {
    this.router.navigate(['/bai-viet/tim-kiem', this.textSearch || '']);
  }
}
