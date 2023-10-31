import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-f3-article-detail',
  templateUrl: './f3-article-detail.component.html',
  styleUrls: ['./f3-article-detail.component.scss'],
})
export class F3ArticleDetailComponent implements AfterViewInit {
  public isBookmark: boolean = false;
  constructor(private el: ElementRef, private renderer: Renderer2) {}
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
