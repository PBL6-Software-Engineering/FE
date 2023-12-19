import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../_services/admin.service';

@Component({
  selector: 'app-f5-hospital-list',
  templateUrl: './f5-hospital-list.component.html',
  styleUrls: ['./f5-hospital-list.component.scss'],
})
export class F5HospitalListComponent implements OnInit, OnDestroy {
  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = false;
  isErrorGetData: boolean = false;

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

  // data source for grid
  dataSources: any[] = [];

  // delete id
  deleteItem: any;
  updateItem: any;
  hospital: any;
  itemSelected: any;
  
  constructor(
    private api: AdminService,
    private toastr: ToastrService,
    public cdr: ChangeDetectorRef,
    private spinnerService: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.idsSelected = new Map();
    this.spinnerService.show();
    this.onLoadData();
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
        .getAllUser({
          page: isResetPage ? 1 : this.currentPage,
          paginate: this.pageSize,
          search: this.textSearch || '',
          sortlatest: true,
          role: 'hospital',
          is_accept: 'both',
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
    }, 500);
  }

  onErrorImage(event: any): void {
    event.target.src = 'assets/media/icon/icon-userDefault.svg';
  }

  changeAccept() {
    this.subscription.push(
      this.api
        .changeAccept(this.itemSelected.id, !this.itemSelected.is_accept)
        .subscribe({
          next: () => {
            if (!this.itemSelected.is_accept) {
              this.toastr.success('Khoá bệnh viện thành công!');
            } else {
              this.toastr.success('Mở khoá bệnh viện thành công!');
            }
            // this.onLoadData();
            this.dataSources.forEach((data) => {
              if (data.id === this.itemSelected.id) {
                data.is_accept = !this.itemSelected.is_accept;
              }
            });
          },
          error: (err) => {
            this.toastr.error('Thay đổi trạng thái thất bại!');
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
