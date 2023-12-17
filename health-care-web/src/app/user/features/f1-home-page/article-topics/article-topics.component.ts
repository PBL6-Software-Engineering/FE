import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { BehaviorService } from 'src/app/core/services/behavior.service';
import { toSlug } from 'src/app/core/services/library.helper';
import { ArticleService } from 'src/app/user/services/article.service';

@Component({
  selector: 'app-article-topics',
  templateUrl: './article-topics.component.html',
  styleUrls: ['./article-topics.component.scss'],
})
export class ArticleTopicsComponent implements OnInit {
  articles: any[] = [
    {
      category: '',
      articles: [],
    },
  ];
  isLoading = false;
  constructor(
    private articleService: ArticleService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private behaviorService: BehaviorService,
  ) {}

  ngOnInit(): void {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    if (categories && categories.length) {
      this.isLoading = true;
      this.spinnerService.show();
      forkJoin([
        this.articleService.getArticles({
          paginate: 3,
          page: 1,
          name_category: categories[0].name,
        }),
        this.articleService.getArticles({
          paginate: 3,
          page: 1,
          name_category: categories[1].name,
        }),
        this.articleService.getArticles({
          paginate: 3,
          page: 1,
          name_category: categories[2].name,
        }),
      ]).subscribe((results: any[]) => {
        const [res1, res2, res3] = results;
        this.isLoading = false;
        this.spinnerService.hide();
        this.articles = [
          {
            category: categories[0].name,
            articles: res1.data.data,
          },
          {
            category: categories[1].name,
            articles: res2.data.data,
          },
          {
            category: categories[2].name,
            articles: res3.data.data,
          },
        ];
      });
    }
  }

  navigateCategoryDetail(item: any) {
    if (item && item.category) {
      const categories = JSON.parse(localStorage.getItem('categories') || '[]');
      const category = categories.find((c: any) => c.name = item.category);
      this.behaviorService.setCategory(category);
      this.router.navigateByUrl(`/danh-muc/${toSlug(category.name)}`);
    }
  }

  navigateArticleDetail(article: any) {
    if (article && article.id_article && article.name_category) {
      this.router.navigateByUrl(
        `/bai-viet/${article.id_article}/${toSlug(article.name_category)}`,
      );
    }
  }
}
