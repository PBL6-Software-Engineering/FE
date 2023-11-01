import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/admin/_services/article.service';
declare var $: any;
@Component({
  selector: 'app-f3-article-detail',
  templateUrl: './f3-article-detail.component.html',
  styleUrls: ['./f3-article-detail.component.scss'],
})
export class F3ArticleDetailComponent implements AfterViewInit, OnInit {
  public isBookmark: boolean = false;
  id: any;
  article: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.articleService.findById(this.id).subscribe({
          next: ({ data }) => {
            this.article = data;
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
