import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/services/common.service';
import { DepartmentService } from 'src/app/user/services/department.service';
@Component({
  selector: 'app-department-search',
  templateUrl: './department-search.component.html',
  styleUrls: ['./department-search.component.css'],
})
export class DepartmentSearchComponent implements OnInit {
  @Input() textSearch: string;
  dataSources: any[] = [];
  isLoading = false;
  isError = false;

  currentPage = 1;
  totalPage = 0;
  totalElements = 0;
  numberElementOfPage = 0;

  // textSearch = '';
  province: any;
  provinces: any[] = [];
  oldTextSearch = '';
  isSearching = false;

  departments: any[] = [];
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private departmentApi: DepartmentService,
  ) {}

  ngOnInit(): void {
    this.oldTextSearch = this.textSearch;
    this.search();
  }

  search() {
    this.isError = false;
    this.isLoading = true;
    this.spinner.show();
    this.dataSources = [];
    this.departmentApi.getDepartments(this.textSearch).subscribe({
      next: ({ data }) => {
        this.dataSources = data.data;
        console.log(data.data)
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
}
