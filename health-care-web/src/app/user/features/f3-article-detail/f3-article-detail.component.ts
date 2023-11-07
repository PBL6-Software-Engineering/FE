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
import { expertService } from '../services/expert.service';
import { prefixApi } from 'src/app/core/constants/api.constant';
declare var $: any;
@Component({
  selector: 'app-f3-article-detail',
  templateUrl: './f3-article-detail.component.html',
  styleUrls: ['./f3-article-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class F3ArticleDetailComponent implements AfterViewInit, OnInit {
  public isBookmark: boolean = false;
  id: any;
  article: any;
  relativeArticles : any;
  doctor: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private articleService: ArticleService,
    private expertService: expertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.articleService.findById(this.id).subscribe({
          next: ({ data }) => {
            this.article = data;
            console.log(this.article);
            this.expertService.getDoctorById(this.article.id_user).subscribe({
              next: ({ data }) => {
                if (data.avatar) {
                  data.avatar = prefixApi + '/' + data.avatar;
                }
                this.doctor = data;
                console.log(this.doctor);
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
                  console.log(this.relativeArticles)
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

  checkToken() {
    ////////////
    return true;
  }
  shareClick() {
    if (this.checkToken())
      var btnShare = this.el.nativeElement.querySelector('#btn-share');
    else {
    }
  }

  bookmarkClick() {
    if (this.checkToken()) {
      var btnBookmark = this.el.nativeElement.querySelector('#btn-bookmark');
      if (this.isBookmark) {
        this.isBookmark = false;
      } else this.isBookmark = true;
    } else {
    }
  }
  ngAfterViewInit() {
    // Kích hoạt Popover
    $(this.el.nativeElement).find('[data-bs-toggle="popover"]').popover();
  }
}
