import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toSlug } from 'src/app/core/services/library.helper';

@Component({
  selector: 'app-article-img-left2',
  templateUrl: './article-img-left2.component.html',
  styleUrls: ['./article-img-left2.component.scss'],
})
export class ArticleImgLeft2Component implements OnInit {
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
