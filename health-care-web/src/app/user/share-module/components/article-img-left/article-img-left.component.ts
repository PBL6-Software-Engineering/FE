import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { toSlug } from 'src/app/core/services/library.helper';

@Component({
  selector: 'app-article-img-left',
  templateUrl: './article-img-left.component.html',
  styleUrls: ['./article-img-left.component.scss'],
})
export class ArticleImgLeftComponent {
  @Input() article: any = {};

  constructor(private router: Router) {}

  navigateArticleDetail(article: any) {
    if (article && article.id_article && article.name_category) {
      this.router.navigateByUrl(
        `/bai-viet/${article.id_article}/${toSlug(article.name_category)}`,
      );
    }
  }
}
