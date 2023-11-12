import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-article-img-left',
  templateUrl: './article-img-left.component.html',
  styleUrls: ['./article-img-left.component.scss'],
})
export class ArticleImgLeftComponent implements OnChanges {
  @Input() article: any = {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.article && this.article.content) {
      this.article.previewContent = this.article.content.replace(
        /<[^>]*>/g,
        ''
      );
      console.log(this.article);
    }
  }
}
