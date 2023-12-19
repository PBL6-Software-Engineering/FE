import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { toSlug } from 'src/app/core/libs/library.helper';

@Component({
  selector: 'app-article-img-top-no-content',
  templateUrl: './article-img-top-no-content.component.html',
  styleUrls: ['./article-img-top-no-content.component.scss'],
})
export class ArticleImgTopNoContentComponent {
  @Input() article: any = {};

  constructor(private router: Router) {}
  ngOnInit(): void {}

  navigateArticleDetail(article: any) {
    if (article && article.id_article && article.name_category) {
      this.router.navigateByUrl(
        `/bai-viet/${article.id_article}/${toSlug(article.name_category)}`,
      );
    }
  }
}
