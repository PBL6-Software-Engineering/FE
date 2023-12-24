import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HealthInsuranceHospitalService } from '../_services/health_insurance_hospital.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';
import { HealthInsuranceService } from '../_services/health_insurance.service';
@Component({
  selector: 'app-f13-health-insurance-hospital',
  templateUrl: './f13-health-insurance-hospital.component.html',
  styleUrls: ['./f13-health-insurance-hospital.component.css'],
})
export class F13HealthInsuranceHospitalComponent implements OnInit, OnDestroy {
  hospital: any;

  textSearch = '';
  lastTextSearch = '';
  isLoading: boolean = false;
  isErrorGetData: boolean = false;
  isSearching = false;
  totalPage = 0;
  subscription: Subscription[] = [];
  dataSources: any[] = [];
  healthInsurances: any[] = [];
  healthInsurance: any;
  currentPage = 1;
  totalElements = 0;
  numberElementOfPage = 0;
  pageSize = 10;
  isSaving = false;

  isSelectAll = false;
  idsSelected: Map<any, boolean> = new Map();

  // delete id
  deleteItem: any;
  updateItem: any;
  constructor(
    private api: HealthInsuranceHospitalService,
    private allApi: HealthInsuranceService,
    private toastr: ToastrService,
    public cdr: ChangeDetectorRef,
    private spinnerService: NgxSpinnerService,
    private tokenStorageService: TokenStorageService,
  ) {}
  ngOnInit() {
    // this.idsSelected = new Map();
    this.spinnerService.show();
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

  onHealthInsuranceChange(selectedItem: any) {
    this.healthInsurance = selectedItem;
    console.log(this.healthInsurance);
  }

  save(): void {
    if (!this.isSaving) {
      this.isSaving = true;
      this.api.create(this.healthInsurance.id).subscribe({
        next: (res) => {
          this.toastr.success('Thêm thành công!');
          // this.reloadData.emit();
          this.onLoadData();
          this.isSaving = false;
        },
        error: (err) => {
          this.toastr.error('Thêm thất bại!');
          console.log(err);
          this.isSaving = false;
        },
      });
    } else {
      this.toastr.error('Vui lòng nhập đầy đủ thông tin');
    }
  }

  getListIdSelect() {
    const ids: any[] = [];
    this.dataSources.forEach((item) => {
      if (item.checked) {
        ids.push(item.id_health_insurance_hospital);
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
          id: this.hospital.id_hospital,
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
      this.allApi
        .getAllHealthInsurance({
          page: 1,
          paginate: 20,
          search: '',
        })
        .subscribe({
          next: ({ data }) => {
            this.healthInsurances = data.data || [];
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
      this.api
        .deleteById(this.deleteItem.id_health_insurance_hospital)
        .subscribe({
          next: () => {
            this.toastr.success('Xoá thành công!');
            this.onLoadData();
          },
          error: (err) => {
            this.toastr.error('Xoá thất bại!');
            console.log(err);
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
