import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cate-card',
  templateUrl: './cate-card.component.html',
  styleUrls: ['./cate-card.component.scss'],
})
export class CateCardComponent {
  @Input() categories: any;
  constructor() {}
}
