import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ExpertService } from '../../../services/expert.service';
import { ArticleService } from 'src/app/user/services/article.service';
declare var $: any;
@Component({
  selector: 'app-f3-article-detail',
  templateUrl: './f3-article-detail.component.html',
  styleUrls: ['./f3-article-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class F3ArticleDetailComponent implements AfterViewInit, OnInit {
  isBookmark: boolean = false;
  id: any;
  name_category: any;
  article: any;
  relativeArticles: any[] = [];
  doctor: any;
  isLoading = true;
  isError = false;

  constructor(
    private el: ElementRef,
    private articleService: ArticleService,
    private expertService: ExpertService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.name_category = params['name_category'];
        this.isLoading = true;
        this.isError = false;
        this.articleService.findById(this.id).subscribe({
          next: ({ data }) => {
            this.article = data;
            this.name_category = this.article.name_category;
            if (this.article.id_user) {
              this.expertService.getDoctorById(this.article.id_user).subscribe({
                next: ({ data }) => {
                  this.doctor = data;
                },
                error: (err) => {
                  console.log('Error', err);
                },
              });
            }
            this.isLoading = false;
            this.isError = false;
          },
          error: (err) => {
            this.isError = true;
            this.isLoading = false;
          },
        });

        if (this.name_category) {
          this.getArticleByCategory(this.name_category);
        }
      }
    });
  }

  ngAfterViewInit() {
    // Kích hoạt Popover
    $(this.el.nativeElement).find('[data-bs-toggle="popover"]').popover();
  }

  getArticleByCategory(name_category: any) {
    this.articleService
      .getArticles({
        page: 1,
        paginate: 3,
        name_category: name_category,
        typesort: 'search_number',
        sortlatest: true,
      })
      .subscribe({
        next: ({ data }) => {
          this.relativeArticles = data.data;
        },
        error: (err) => {
          console.log('Error', err);
        },
      });
  }
}
