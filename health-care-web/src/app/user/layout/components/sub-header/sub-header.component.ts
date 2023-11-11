import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { isObject } from 'lodash';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
})
export class SubHeaderComponent implements OnInit {
  @Input() data = {
    title: '',
    items: [
      {
        thumbnail: '',
        name: '',
      },
    ],
    tab: '',
  };
  @Output() closeSubHeader = new EventEmitter();

  articles: any = [];
  hospitals: any[] = [];

  constructor(private router: Router, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.articles = JSON.parse(
      localStorage.getItem('articlesOutstanding') || '[]'
    );
    this.hospitals = JSON.parse(
      localStorage.getItem('hospitalsOutStanding') || '[]'
    );
    this.articles = this.articles.slice(0, 3);
    this.hospitals = this.hospitals.slice(0, 3);

    this.articles.forEach((article: any) => {
      article.content = article.content.replace(/<[^>]*>/g, '');
    });
  }

  onCloseSubHeader(): void {
    this.closeSubHeader.emit();
  }

  viewAll(): void {
    let url = '';
    if (this.data.tab === 'CATEGORY') {
      url = 'category';
    } else if (this.data.tab === 'BOOKING_DOCTOR') {
      url = 'departments';
    } else if (this.data.tab === 'SOCIAL') {
      url = 'departments';
    }
    this.router.navigateByUrl(url);
    this.onCloseSubHeader();
  }

  viewCategory(id: any): void {
    this.router.navigateByUrl(`/article/${id}`);
    this.onCloseSubHeader();
  }

  viewHospital(id: any): void {
    this.router.navigateByUrl(`/benh-vien/chi-tiet/${id}`);
    this.onCloseSubHeader();
  }
}
