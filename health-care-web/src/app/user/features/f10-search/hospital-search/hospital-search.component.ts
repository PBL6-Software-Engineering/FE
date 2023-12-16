import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from 'src/app/user/services/hospital.service';

@Component({
  selector: 'app-hospital-search',
  templateUrl: './hospital-search.component.html',
  styleUrls: ['./hospital-search.component.css'],
})
export class HospitalSearchComponent implements OnInit {
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
    private hospitalService: HospitalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.textSearch = params['textSearch'] || '';
      this.oldTextSearch = this.textSearch;
      this.search();
    });
  }

  search() {
    this.isError = false;
    this.isLoading = true;
    this.spinner.show();
    this.dataSources = [];
    this.hospitalService
      .paginate({
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

  searchHospital() {
    this.router.navigate(['/benh-vien/tim-kiem', this.textSearch || '']);
  }
}
