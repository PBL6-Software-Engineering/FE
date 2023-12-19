import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorService } from 'src/app/core/services/behavior.service';
import { toSlug } from 'src/app/core/libs/library.helper';

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

  @Input() articles: any = [];
  @Input() hospitals: any[] = [];

  constructor(
    private router: Router,
    private behaviorService: BehaviorService,
  ) {}

  ngOnInit(): void {}

  onCloseSubHeader(): void {
    this.closeSubHeader.emit();
  }

  viewAll(): void {
    let url = '';
    if (this.data.tab === 'CATEGORY') {
      url = '/danh-muc';
    } else if (this.data.tab === 'BOOKING_DOCTOR') {
      url = '/chuyen-khoa';
    } else if (this.data.tab === 'SOCIAL') {
      url = '/chuyen-khoa';
    }
    this.router.navigateByUrl(url);
    this.onCloseSubHeader();
  }

  viewArticle(id: any, name_category: any): void {
    this.router.navigateByUrl(`/bai-viet/${id}/${toSlug(name_category)}`);
    this.onCloseSubHeader();
  }

  viewHospital(id: any): void {
    this.router.navigateByUrl(`/benh-vien/chi-tiet/${id}`);
    this.onCloseSubHeader();
  }

  viewItem(item: any): void {
    if (this.data.tab === 'CATEGORY') {
      this.behaviorService.setCategory(item);
      this.router.navigateByUrl(`/danh-muc/${toSlug(item.name)}`);
    } else if (this.data.tab === 'BOOKING_DOCTOR') {
      this.router.navigateByUrl(`/chuyen-khoa/${item.name}`);
    } else if (this.data.tab === 'SOCIAL') {
      this.behaviorService.setCategory(item);
      this.router.navigateByUrl(`/danh-muc/${toSlug(item.name)}`);
    }
    this.onCloseSubHeader();
  }
}
