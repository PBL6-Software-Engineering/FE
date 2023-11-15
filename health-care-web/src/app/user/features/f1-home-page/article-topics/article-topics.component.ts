import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { ArticleService } from 'src/app/admin/_services/article.service';

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
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    if (categories && categories.length) {
      this.isLoading = true;
      this.spinnerService.show();
      forkJoin([
        this.articleService.getArticleByCategory({
          name_category: categories[0].name,
        }),
        this.articleService.getArticleByCategory({
          name_category: categories[1].name,
        }),
        this.articleService.getArticleByCategory({
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
}
