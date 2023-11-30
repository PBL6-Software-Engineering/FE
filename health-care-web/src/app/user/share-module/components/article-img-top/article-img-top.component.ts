import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-img-top',
  templateUrl: './article-img-top.component.html',
  styleUrls: ['./article-img-top.component.scss'],
})
export class ArticleImgTopComponent {
  @Input() article: any = {};

  constructor() {}
}
