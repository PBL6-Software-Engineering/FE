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
import { prefixApi } from '../../../../core/constants/api.constant';
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
        ids.push(item.id_hospital_service);
      }
    });
    return ids;
  }

  constructor(
    private api: ServiceHospitalService,
    private router: Router,
    private el: ElementRef,
    private toastr: ToastrService,
    public cdr: ChangeDetectorRef,
    private tokenStorageService: TokenStorageService,
    private spinnerService: NgxSpinnerService
  ) {
    this.tokenStorageService
      .getUser()
      .subscribe((user: any) => (this.hospital = JSON.parse(user)));
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
          paginate: 20,
          search: this.textSearch || '',
          sortLatest: true,
          id_hospital: this.hospital.id,
        })
        .subscribe({
          next: ({ data }) => {
            data.data.forEach((item: any) => {
              if (item.thumbnail_department) {
                item.thumbnail_department = `${prefixApi}/${item.thumbnail_department}`;
              }
            });
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
        })
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
      })
    );
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
      })
    );
    this.isSelectAll = false;
  }

  updateCheckedDataSources() {
    if (this.dataSources.length === 0) {
      this.isSelectAll = false;
    } else {
      // checked item when id exist in map
      if (this.idsSelected.size > 0) {
        this.dataSources.forEach((data: any) => {
          if (this.idsSelected.get(data.id_hospital_service)) {
            data.checked = true;
          }
        });
      }
      this.isSelectAll =
        this.dataSources.findIndex((data: any) => !data.checked) === -1;
    }
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
}