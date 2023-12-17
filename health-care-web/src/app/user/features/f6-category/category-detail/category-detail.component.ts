import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpertService } from '../../../services/expert.service';
import { ArticleService } from 'src/app/user/services/article.service';
import { BehaviorService } from 'src/app/core/services/behavior.service';
import { toSlug } from 'src/app/core/services/library.helper';

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
    private expertService: ExpertService,
    private behaviorService: BehaviorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.behaviorService.category.subscribe((category) => {
      this.category = category;
      if (this.category && this.category.name) {
        this.nameCategory = this.category.name;

        this.expertService.getDoctor().subscribe({
          next: ({ data }) => {
            this.doctors = data.data;
          },
        });

        this.articleService
          .getArticles({
            page: 1,
            name_category: this.nameCategory,
            paginate: 15,
          })
          .subscribe({
            next: ({ data }) => {
              this.articles = data.data;
            },
          });
        this.categories = JSON.parse(
          localStorage.getItem('categories') || '[]',
        );
      } else {
        this.router.navigateByUrl('/danh-muc');
      }
    });
  }

  navigateArticleDetail(article: any) {
    if (article && article.id_article && article.name_category) {
      this.router.navigateByUrl(
        `/bai-viet/${article.id_article}/${toSlug(article.name_category)}`,
      );
    }
  }
}
