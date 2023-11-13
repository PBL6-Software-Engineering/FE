import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/admin/_services/article.service';
import { ExpertService } from '../../services/expert.service';
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
  article: any;
  relativeArticles: any[] = [];
  doctor: any;

  constructor(
    private el: ElementRef,
    private articleService: ArticleService,
    private expertService: ExpertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.articleService.findById(this.id).subscribe({
          next: ({ data }) => {
            this.article = data;
            this.expertService.getDoctorById(this.article.id_user).subscribe({
              next: ({ data }) => {
                this.doctor = data;
              },
              error: (err) => {
                console.log('Error', err);
              },
            });
            this.articleService
              .getArticleByCategory({
                page: 1,
                paginate: 3,
                name_category: this.article.name_category,
                sort_search_number: true,
              })
              .subscribe({
                next: ({ data }) => {
                  this.relativeArticles = data.data;
                },
                error: (err) => {
                  console.log('Error', err);
                },
              });
          },
        });
      }
    });
  }

  ngAfterViewInit() {
    // Kích hoạt Popover
    $(this.el.nativeElement).find('[data-bs-toggle="popover"]').popover();
  }
}
