import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/admin/_services/article.service';
import { ExpertService } from '../../services/expert.service';

@Component({
  selector: 'app-f10-search',
  templateUrl: './f10-search.component.html',
  styleUrls: ['./f10-search.component.css'],
})
export class F10SearchComponent implements OnInit {
  dataSources: any[] = [];
  isLoading = false;
  isError = false;

  currentPage = 1;
  
  totalPage = 0;
  totalElements = 0;
  numberElementOfPage = 0;

  textSearch = '';
  province: any;
  provinces: any[] = [];
  oldTextSearch = '';
  isSearching = false;

  constructor(
    private api: ArticleService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private expertApi: ExpertService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.oldTextSearch = this.textSearch;
      this.textSearch = params['textSearch'] || '';
      this.search();
    });
    this.provinces = JSON.parse(localStorage.getItem('provinces') || '[]');
  }

  search() {
    this.isError = false;
    this.isLoading = true;
    this.spinner.show();
    this.dataSources = [];
    this.expertApi.getDoctor(this.textSearch).subscribe({
      next: ({ data }) => {},
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

  searchAll() {
    this.router.navigate(['/tim-kiem', this.textSearch || '']);
  }
}
