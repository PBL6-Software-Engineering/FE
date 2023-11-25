import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-article-img-top-no-content',
  templateUrl: './article-img-top-no-content.component.html',
  styleUrls: ['./article-img-top-no-content.component.scss'],
})
export class ArticleImgTopNoContentComponent {
  @Input() article: any = {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.article && this.article.content) {
      this.article.previewContent = this.article.content.replace(
        /<[^>]*>/g,
        '',
      );
    }
  }
}
