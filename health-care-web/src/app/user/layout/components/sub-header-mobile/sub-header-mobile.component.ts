import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sub-header-mobile',
  templateUrl: './sub-header-mobile.component.html',
  styleUrls: ['./sub-header-mobile.component.scss']
})
export class SubHeaderMobileComponent {
  @Input() data: any;
  @Output() closeSubHeader = new EventEmitter();
  
  news: any = [];

  constructor() {
    this.news.push({
      image: 'https://cdn.hellobacsi.com/wp-content/uploads/2023/02/HB_3.png',
      title: 'Là phụ nữ, chọn yêu mình',
    });
    this.news.push({
      image: 'https://cdn.hellobacsi.com/wp-content/uploads/2022/12/SPL_248x357.png',
      title: 'Chào 2023 - Chào 12 tháng khỏe',
    });
    this.news.push({
      image: 'https://cdn.hellobacsi.com/wp-content/uploads/2022/11/small_248x357@2x-452x650.png',
      title: 'Nâng cao hiểu biết về Đái tháo đường (14/11)',
    });
    this.news.push({
      image: 'https://cdn.hellobacsi.com/wp-content/uploads/2022/11/noshave_2.png',
      title: 'Tháng Nâng cao nhận thức về Sức khỏe nam giới',
    });
  }
}
