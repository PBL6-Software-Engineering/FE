import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/admin/_services/article.service';
import { ExpertService } from '../../../services/expert.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit {
  articles: any[] = [];
  category: any;
  nameCategory: any;
  categories: any[] = [];
  doctors: any[];
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private expertService: ExpertService
  ) {}

  ngOnInit(): void {
    this.expertService.getDoctor().subscribe({
      next: ({ data }) => {
        this.doctors = data.data;
      },
    });
    this.categories = JSON.parse(localStorage.getItem('categories') || '[]');
    this.route.params.subscribe((params) => {
      if (params['name']) {
        this.nameCategory = params['name'];
        this.category = this.categories.find(
          (c: any) => c.name === this.nameCategory
        );

        this.articleService
          .getArticleByCategory({
            page: 1,
            name_category: this.nameCategory,
            paginate: 15,
          })
          .subscribe({
            next: ({ data }) => {
              this.articles = data.data;
            },
          });
      }
    });
  }
}
