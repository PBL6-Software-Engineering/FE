import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-img-left',
  templateUrl: './article-img-left.component.html',
  styleUrls: ['./article-img-left.component.scss'],
})
export class ArticleImgLeftComponent {
  @Input() article: any = {};
  constructor() {}
}
