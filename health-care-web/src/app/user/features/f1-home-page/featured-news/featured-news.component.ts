import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-news',
  templateUrl: './featured-news.component.html',
  styleUrls: ['./featured-news.component.scss'],
})
export class FeaturedNewsComponent implements OnInit {
  articles: any[] = [];
  articleTop: any;

  constructor() {}

  ngOnInit(): void {
    const articlesOutstanding = localStorage.getItem('articlesOutstanding');
    if (articlesOutstanding) {
      this.articles = JSON.parse(articlesOutstanding);
      this.articleTop = this.articles[0];
    }
  }
}
