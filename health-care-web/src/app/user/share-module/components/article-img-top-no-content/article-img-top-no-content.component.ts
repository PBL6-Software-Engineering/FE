import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-img-top-no-content',
  templateUrl: './article-img-top-no-content.component.html',
  styleUrls: ['./article-img-top-no-content.component.scss'],
})
export class ArticleImgTopNoContentComponent {
  @Input() article: any = {};

  constructor() {}
}
