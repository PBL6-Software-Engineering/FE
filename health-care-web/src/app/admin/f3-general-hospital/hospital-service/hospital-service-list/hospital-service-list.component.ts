import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceHospitalService } from 'src/app/admin/_services/service_hospital.service';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-hospital-service-list',
  templateUrl: './hospital-service-list.component.html',
  styleUrls: ['./hospital-service-list.component.scss'],
})
export class HospitalServiceListComponent implements OnInit, OnDestroy {
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

  constructor(
    private api: ServiceHospitalService,
    private router: Router,
    private el: ElementRef,
    private toastr: ToastrService,
    public cdr: ChangeDetectorRef,
    private tokenStorageService: TokenStorageService,
    private spinnerService: NgxSpinnerService,
  ) {
    this.tokenStorageService
      .getUser()
      .subscribe((user: any) => (this.hospital = user));
  }

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
  }

  onDeleteOne() {
    this.subscription.push(
      this.api.deleteById(this.deleteItem.id_hospital_service).subscribe({
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
    }, 500);
  }

  onErrorImage(event: any): void {
    event.target.src = 'assets/media/icon/icon-userDefault.svg';
  }

  onChangePageSize(pageSize: any) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.onLoadData();
  }
}
