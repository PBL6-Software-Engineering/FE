import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DepartmentHospitalService } from 'src/app/admin/_services/department_hospital.service';
import { DepartmentService } from 'src/app/admin/_services/department.service';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-hospital-department-list',
  templateUrl: './hospital-department-list.component.html',
  styleUrls: ['./hospital-department-list.component.scss'],
})
export class HospitalDepartmentListComponent implements OnInit, OnDestroy {
  // hospital login
  hospital: any;

  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = false;

  isSelectAll = false;
  idsSelected: Map<any, boolean> = new Map();

  currentPage = 1;
  totalPage = 0;
  pageSize = 20;
  totalElements = 0;
  numberElementOfPage = 0;

  textSearch = '';
  lastTextSearch = '';
  isSearching = false;
  isErrorGetData = false;

  // data source for grid
  dataSources: any[] = [];
  departments: any[] = [];

  // delete id
  deleteItem: any;
  updateItem: any;

  constructor(
    private api: DepartmentHospitalService,
    private departmentService: DepartmentService,
    private toastr: ToastrService,
    public cdr: ChangeDetectorRef,
    private tokenStorageService: TokenStorageService,
    private spinnerService: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.idsSelected = new Map();
    this.tokenStorageService.getUser().subscribe((user: any) => {
      this.hospital = user;
      this.spinnerService.show();
      this.onLoadData();
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((item) => {
      item.unsubscribe();
    });
  }

  onLoadData(isResetPage = false) {
    this.isLoading = true;
    this.isErrorGetData = false;
    this.spinnerService.show();
    this.subscription.push(
      this.api
        .paginate({
          page: isResetPage ? 1 : this.currentPage,
          paginate: this.pageSize,
          search: this.textSearch || '',
          sortLatest: true,
          id_hospital: this.hospital.id,
        })
        .subscribe({
          next: ({ data }) => {
            this.dataSources = data.data || [];
            this.currentPage = data.current_page; // trang hiện tại
            this.totalPage = data.last_page; // số trang
            this.totalElements = data.total; // tổng số phần tử trong database
            this.numberElementOfPage = this.dataSources.length; // số phần tử của 1 trang
          },
          error: (err) => {
            this.isErrorGetData = true;
            this.toastr.error('Lỗi! Không thể tải dữ liệu');
            this.isLoading = false;
            this.spinnerService.hide();
          },
          complete: () => {
            this.isLoading = false;
            this.spinnerService.hide();
          },
        }),
    );
    this.subscription.push(
      this.departmentService
        .getDepartmentsNotCreatedByHospitalId(this.hospital.id)
        .subscribe(({ data }) => {
          this.departments = data;
        }),
    );
  }

  onDeleteOne() {
    this.subscription.push(
      this.api.deleteById(this.deleteItem.id_hospital_departments).subscribe({
        next: () => {
          this.toastr.success('Xoá thành công!');
          this.onLoadData();
        },
        error: (err) => {
          this.toastr.error('Xoá thất bại!');
        },
      }),
    );
  }
  
  onChangePage(page: number) {
    this.currentPage = page;
    this.onLoadData();
  }

  search(): void {
    this.isSearching = true;

    setTimeout(() => {
      this.isSearching = false;
      this.cdr.detectChanges();

      // call api one second one time
      if (this.textSearch !== this.lastTextSearch) {
        this.lastTextSearch = this.textSearch;
        this.currentPage = 1;

        // call api search
        this.onLoadData();
      }
    }, 1000);
  }

  onChangePageSize(pageSize: any) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.onLoadData();
  }
}
