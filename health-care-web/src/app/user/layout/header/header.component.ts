import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HospitalService } from '../../services/hospital.service';
import { ArticleService } from '../../services/article.service';
import { SpeechToTextService } from '../../services/speech-to-text.service';
import { BehaviorService } from 'src/app/core/services/behavior.service';
import { toSlug } from 'src/app/core/services/library.helper';

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

  /**
   * This is the toogle button elemenbt, look at HTML and see its defination
   */
  @ViewChild('toggleSubHeader1') toggleSubHeader1: ElementRef;
  @ViewChild('toggleSubHeader2') toggleSubHeader2: ElementRef;
  @ViewChild('subHeader') menu: ElementRef;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private articleService: ArticleService,
    private hospitalService: HospitalService,
    private renderer: Renderer2,
    private speechToTextService: SpeechToTextService,
    private cdr: ChangeDetectorRef,
    private behaviorService: BehaviorService
  ) {
    /**
     * This events get called by all clicks on the page
     */
    this.renderer.listen('window', 'click', (e: Event) => {
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      if (
        e.target !== this.toggleSubHeader1.nativeElement &&
        e.target !== this.toggleSubHeader2.nativeElement &&
        e.target !== this.menu.nativeElement &&
        !this.menu.nativeElement.contains(e.target)
      ) {
        this.isOpenSubMenuBar = false;
      }
    });
  }

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
    this.behaviorService.setSearchText(this.textSearch);
    this.router.navigate(['/bai-viet/tim-kiem', toSlug(this.textSearch)]);
  }

  isListening = false;
  startListening(): void {
    if (!this.isListening) {
      this.isListening = true;
      this.speechToTextService.startListening((text: string) => {
        this.textSearch = text;
        this.searchArticle();
        this.cdr.detectChanges();
        this.stopListening();
        this.isListening = false;
      });
    } else {
      this.stopListening();
      this.isListening = false;
    }
  }

  stopListening(): void {
    this.speechToTextService.stopListening();
  }
}
