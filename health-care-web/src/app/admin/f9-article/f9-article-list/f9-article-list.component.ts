import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from '../../_services/article.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-f9-article-list',
  templateUrl: './f9-article-list.component.html',
  styleUrls: ['./f9-article-list.component.scss'],
})
export class F9ArticleListComponent implements OnInit, OnDestroy {
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
  role = '';

  // data source for grid
  dataSources: any[] = [];

  // delete id
  deleteItem: any;
  updateItem: any;
  itemSelected: any;

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
        ids.push(item.id_article);
      }
    });
    return ids;
  }

  constructor(
    private api: ArticleService,
    private router: Router,
    private el: ElementRef,
    private toastr: ToastrService,
    public cdr: ChangeDetectorRef,
    private spinnerService: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.idsSelected = new Map();
    this.role = localStorage.getItem('role') || '';
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
        .getArticles({
          page: isResetPage ? 1 : this.currentPage,
          paginate: this.pageSize,
          search: this.textSearch || '',
          sortLatest: true,
          role: this.role,
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
      this.api.deleteById(this.deleteItem.id_article).subscribe({
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

  updateCheckedDataSources() {
    if (this.dataSources.length === 0) {
      this.isSelectAll = false;
    } else {
      // checked item when id exist in map
      if (this.idsSelected.size > 0) {
        this.dataSources.forEach((data: any) => {
          if (this.idsSelected.get(data.id_article)) {
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

  changeHideShow() {
    this.subscription.push(
      this.api
        .changeShow(this.itemSelected.id_article, !this.itemSelected.is_show)
        .subscribe({
          next: () => {
            if (this.itemSelected.is_show) {
              this.toastr.success('Ẩn bài viết thành công!');
            } else {
              this.toastr.success('Hiện bài viết thành công!');
            }
            // this.onLoadData();
            this.dataSources.forEach((data) => {
              if (data.id_article === this.itemSelected.id_article) {
                data.is_show = !this.itemSelected.is_show;
              }
            });
          },
          error: (err) => {
            this.toastr.error('Thay đổi trạng thái thất bại!');
          },
        }),
    );
  }

  changeAccept() {
    this.subscription.push(
      this.api
        .changeAccept(
          this.itemSelected.id_article,
          !this.itemSelected.is_accept,
        )
        .subscribe({
          next: () => {
            if (!this.itemSelected.is_accept) {
              this.toastr.success('Phê duyệt bài viết thành công!');
            } else {
              this.toastr.success('Hủy phê duyệt bài viết thành công!');
            }
            // this.onLoadData();
            this.dataSources.forEach((data) => {
              if (data.id_article === this.itemSelected.id_article) {
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
