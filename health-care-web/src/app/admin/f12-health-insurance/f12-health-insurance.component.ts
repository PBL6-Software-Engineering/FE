import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HealthInsuranceService } from '../_services/health_insurance.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-f12-health-insurance',
  templateUrl: './f12-health-insurance.component.html',
  styleUrls: ['./f12-health-insurance.component.css'],
})
export class F12HealthInsuranceComponent implements OnInit, OnDestroy {
  textSearch = '';
  lastTextSearch = '';
  isLoading: boolean = false;
  isErrorGetData: boolean = false;
  isSearching = false;
  totalPage = 0;
  subscription: Subscription[] = [];
  dataSources: any[] = [];
  currentPage = 1;
  totalElements = 0;
  numberElementOfPage = 0;
  pageSize=10;

  isSelectAll = false;
  idsSelected: Map<any, boolean> = new Map();

  // delete id
  deleteItem: any;
  updateItem: any;
  constructor(
    private api: HealthInsuranceService,
    private toastr: ToastrService,
    public cdr: ChangeDetectorRef,
    private spinnerService: NgxSpinnerService,
  ) {}
  ngOnInit() {
    // this.idsSelected = new Map();
    this.spinnerService.show();
    this.onLoadData();
  }
  ngOnDestroy() {
    this.subscription.forEach((item) => {
      item.unsubscribe();
    });
  }

  onCheckAllSelected() {
    this.isSelectAll = !this.isSelectAll;
    // check or uncheck all items
    this.dataSources.forEach((item) => {
      item.checked = this.isSelectAll;
    });
  }

  onItemSelected(item: any) {
    item.checked = !item.checked;
    this.isSelectAll = this.dataSources.findIndex((t) => !t.checked) === -1;
  }

  getListIdSelect() {
    const ids: any[] = [];
    this.dataSources.forEach((item) => {
      if (item.checked) {
        ids.push(item.id);
      }
    });
    return ids;
  }
  onDeleteMany() {
    this.subscription.push(
      this.api.deleteMany(this.getListIdSelect()).subscribe({
        next: () => {
          this.toastr.success('Xoá thành công!');
          this.onLoadData();
        },
        error: (err) => {
          this.toastr.error('Xoá thất bại!');
        },
      }),
    );
    this.isSelectAll = false;
  }

  onLoadData(isResetPage = false) {
    this.isLoading = true;
    this.isErrorGetData = false;
    this.spinnerService.show();
    this.subscription.push(
      this.api
        .getAllHealthInsurance({
          page: isResetPage ? 1 : this.currentPage,
          paginate: this.pageSize,
          search: this.textSearch || '',
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
  onDeleteOne() {
    this.subscription.push(
      this.api.deleteById(this.deleteItem.id).subscribe({
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
  onChangePageSize(pageSize: any) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.onLoadData();
  }
}
