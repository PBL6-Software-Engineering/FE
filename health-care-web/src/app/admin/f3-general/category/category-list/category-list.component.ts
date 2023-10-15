import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/admin/_services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
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

  // data source for grid
  dataSources: any[] = [];

  // delete id
  deleteItem: any;
  updateItem: any;

  constructor(
    private api: CategoryService,
    private router: Router,
    private el: ElementRef,
    private toastr: ToastrService
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

  onLoadData() {
    this.subscription.push(
      this.api
        .paginate({
          page: this.currentPage,
          paginate: 20,
          search: '',
          sortLastest: true,
        })
        .subscribe(({ data }) => {
          this.dataSources = data.data || [];
          this.dataSources.forEach((item: any) => {
            if (item.thumbnail) {
              item.thumbnail = 'http://localhost:99/' + item.thumbnail;
            }
            if (item.image) {
              item.image = 'http://localhost:99/' + item.image;
            }
          });
          this.currentPage = data.current_page; // trang hiện tại
          this.totalPage = data.last_page; // số trang
          this.totalElements = data.total; // tổng số phần tử trong database
          this.numberElementOfPage = this.dataSources.length; // số phần tử của 1 trang
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

  onSearchChange(keyword: string) {
    //nếu tồn tại keyword
    if (keyword !== '') {
      this.totalPage = this.dataSources.length;
      this.updateCheckedDataSources();
    } else {
      this.onLoadData();
    }
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
}
