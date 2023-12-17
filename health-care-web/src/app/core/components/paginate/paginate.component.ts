import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss'],
})
export class PaginateComponent implements OnInit, OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPage: number = 1;
  @Input() totalElements: number = 1;
  @Input() numberElementOfPage: number = 1;
  @Input() pageSize: number = 20;
  @Output() changePage = new EventEmitter<number>();
  @Output() changePageSize = new EventEmitter<number>();

  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  arrayNumberPage: number[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setPagination();
  }

  ngOnInit(): void {
    this.setPagination();
  }

  private setPagination() {
    if (this.totalPage <= 5) {
      this.arrayNumberPage = [];
      for (let i = 1; i <= this.totalPage; i++) {
        this.arrayNumberPage[i - 1] = i;
      }
    } else if (this.currentPage + 2 <= this.totalPage) {
      if (this.currentPage > 3) {
        this.arrayNumberPage[0] = this.currentPage - 2;
        this.arrayNumberPage[1] = this.currentPage - 1;
        this.arrayNumberPage[2] = this.currentPage;
        this.arrayNumberPage[3] = this.currentPage + 1;
        this.arrayNumberPage[4] = this.currentPage + 2;
      } else {
        this.arrayNumberPage[0] = 1;
        this.arrayNumberPage[1] = 2;
        this.arrayNumberPage[2] = 3;
        this.arrayNumberPage[3] = 4;
        this.arrayNumberPage[4] = 5;
      }
    } else {
      this.arrayNumberPage[0] = this.totalPage - 4;
      this.arrayNumberPage[1] = this.totalPage - 3;
      this.arrayNumberPage[2] = this.totalPage - 2;
      this.arrayNumberPage[3] = this.totalPage - 1;
      this.arrayNumberPage[4] = this.totalPage;
    }
  }

  firstPage() {
    if (this.currentPage > 1) {
      this.onChangePage(1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.onChangePage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.onChangePage(this.currentPage + 1);
    }
  }

  endPage() {
    if (this.currentPage < this.totalPage) {
      this.onChangePage(this.totalPage);
    }
  }

  onChangePage(page: number): void {
    this.changePage.emit(page);
  }

  onChangePageSize(): void {
    this.changePageSize.emit(this.pageSize || 20);
  }
}
