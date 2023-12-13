import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/user/services/article.service';

@Component({
  selector: 'app-featured-news',
  templateUrl: './featured-news.component.html',
  styleUrls: ['./featured-news.component.scss'],
})
export class FeaturedNewsComponent implements OnInit {
  articles: any[] = [];
  articleTop: any;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles({ paginate: 5 }).subscribe(({ data }) => {
      this.articles = data.data;
      this.articleTop = this.articles[0];
      this.articles.splice(0, 1);
    });
  }
}
