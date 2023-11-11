import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-article-img-right',
  templateUrl: './article-img-right.component.html',
  styleUrls: ['./article-img-right.component.scss'],
})
export class ArticleImgRightComponent {
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
