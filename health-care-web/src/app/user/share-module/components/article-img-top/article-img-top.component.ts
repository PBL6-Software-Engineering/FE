import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-article-img-top',
  templateUrl: './article-img-top.component.html',
  styleUrls: ['./article-img-top.component.scss'],
})
export class ArticleImgTopComponent implements OnChanges {
  @Input() article: any = {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.article && this.article.content) {
      this.article.previewContent = this.article.content.replace(
        /<[^>]*>/g,
        ''
      );
    }
  }
}
