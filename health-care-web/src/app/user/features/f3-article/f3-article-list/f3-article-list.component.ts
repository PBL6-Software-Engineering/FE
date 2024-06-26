import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/admin/_services/article.service';
import { HospitalService } from 'src/app/admin/_services/hospital.service';
import { BehaviorService } from 'src/app/core/services/behavior.service';
import { toSlug } from 'src/app/core/libs/library.helper';

@Component({
  selector: 'app-f3-article-list',
  templateUrl: './f3-article-list.component.html',
  styleUrls: ['./f3-article-list.component.scss'],
})
export class F3ArticleListComponent implements OnInit {
  dataSources: any[] = [];
  isLoading = false;
  isError = false;

  currentPage = 1;
  totalPage = 0;
  totalElements = 0;
  numberElementOfPage = 0;

  textSearch = '';
  oldTextSearch = '';
  isSearching = false;

  constructor(
    private api: ArticleService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private behaviorService: BehaviorService,
  ) {}

  ngOnInit(): void {
    this.behaviorService.getSearchText().subscribe((text: any) => {
      this.oldTextSearch = text;
      this.textSearch = text;
      this.search();
    });
  }

  search() {
    this.isError = false;
    this.isLoading = true;
    this.spinner.show();
    this.dataSources = [];
    this.api
      .getArticles({
        page: this.currentPage,
        paginate: 15,
        search: this.textSearch,
      })
      .subscribe({
        next: ({ data }) => {
          this.dataSources = data.data;

          this.currentPage = data.current_page; // trang hiện tại
          this.totalPage = data.last_page; // số trang
          this.totalElements = data.total; // tổng số phần tử trong database
          this.numberElementOfPage = this.dataSources.length; // số phần tử của 1 trang

          this.isError = false;
          this.isLoading = false;
          this.spinner.hide();
        },
        error: (err) => {
          this.isError = true;
          this.isLoading = false;
          this.spinner.hide();
          this.toastr.error('Lỗi tải dữ liệu, vui lòng thử lại!');
        },
      });
  }

  onChangePage(page: number) {
    this.currentPage = page;
    this.search();
  }

  searchArticle() {
    this.behaviorService.setSearchText(this.textSearch);
    this.router.navigate(['/bai-viet/tim-kiem', toSlug(this.textSearch)]);
  }
}
