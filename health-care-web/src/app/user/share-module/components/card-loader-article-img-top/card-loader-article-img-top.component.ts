import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-loader-article-img-top',
  templateUrl: './card-loader-article-img-top.component.html',
  styleUrls: ['./card-loader-article-img-top.component.css'],
})
export class CardLoaderArticleImgTopComponent {
  @Input() isDisplayAuthor = true;
}
