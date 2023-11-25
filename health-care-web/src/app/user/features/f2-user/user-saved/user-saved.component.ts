import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-saved',
  templateUrl: './user-saved.component.html',
  styleUrls: ['./user-saved.component.scss'],
})
export class UserSavedComponent implements OnInit {
  tab = 'articles';
  items: any[] = [];
  number = 0;
  constructor() {}
  ngOnInit(): void {
    // for(let i = 0; i < 3; i++) {
    //   this.items.push({
    //     id: '1',
    //     image: 'https://cdn.hellobacsi.com/wp-content/uploads/2022/11/ky-nang-thoat-khoi-dam-chay_1383452480.jpg',
    //     type: 'Sơ cứu & Phòng ngừa',
    //     title: 'Biết trước khi cần: 8 kỹ năng thoát khỏi đám cháy',
    //     author: {
    //       avatar: 'https://cdn.hellobacsi.com/wp-content/uploads/2021/02/noel2-scaled-150x150.jpg',
    //       name: 'Đài Trương'
    //     }
    //   });
    // }
    this.number = this.items.length;
  }

  chooseTab(tab: string): void {
    this.tab = tab;
  }
}
