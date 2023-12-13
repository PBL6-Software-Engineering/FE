import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-img-right',
  templateUrl: './article-img-right.component.html',
  styleUrls: ['./article-img-right.component.scss'],
})
export class ArticleImgRightComponent {
  @Input() article: any = {};

  constructor() {}
}
