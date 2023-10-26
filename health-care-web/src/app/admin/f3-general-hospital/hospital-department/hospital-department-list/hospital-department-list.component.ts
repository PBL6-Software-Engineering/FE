import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { prefixApi } from '../../../../core/constants/api.constant';
import { DepartmentHospitalService } from 'src/app/admin/_services/department_hospital.service';
import { DepartmentService } from 'src/app/admin/_services/department.service';

@Component({
  selector: 'app-hospital-department-list',
  templateUrl: './hospital-department-list.component.html',
  styleUrls: ['./hospital-department-list.component.scss'],
})
export class HospitalDepartmentListComponent implements OnInit, OnDestroy {
  // id hospital login
  id_hospital = 1;

  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = false;

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
  departments: any[] = [];

  // delete id
  deleteItem: any;
  updateItem: any;

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

  constructor(
    private api: DepartmentHospitalService,
    private departmentService: DepartmentService,
    private toastr: ToastrService,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.idsSelected = new Map();
    this.onLoadData();
  }

  ngOnDestroy() {
    this.subscription.forEach((item) => {
      item.unsubscribe();
    });
  }

  onLoadData(isResetPage = false) {
    this.subscription.push(
      this.api
        .paginate({
          page: isResetPage ? 1 : this.currentPage,
          paginate: 20,
          search: this.textSearch || '',
          sortLatest: true,
          id_hospital: this.id_hospital,
        })
        .subscribe(({ data }) => {
          console.log(data);
          this.dataSources = data.data || [];
          // this.dataSources = data;
          this.dataSources.forEach((item: any) => {
            if (item.thumbnail && item.thumbnail.indexOf('http') === -1) {
              item.thumbnail = prefixApi + item.thumbnail;
            }
            if (item.image && item.image.indexOf('http') === -1) {
              item.image = prefixApi + item.image;
            }
          });
          this.currentPage = data.current_page; // trang hiện tại
          this.totalPage = data.last_page; // số trang
          this.totalElements = data.total; // tổng số phần tử trong database
          this.numberElementOfPage = this.dataSources.length; // số phần tử của 1 trang
        })
    );

    this.subscription.push(
      this.departmentService
        .getDepartmentsNotCreatedByHospitalId(this.id_hospital)
        .subscribe(({ data }) => {
          this.departments = data;
          console.log(data);
        })
    );
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
          if (this.idsSelected.get(data.id)) {
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
    }, 1000);
  }
}
