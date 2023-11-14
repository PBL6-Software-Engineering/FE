import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserWorkScheduleService } from 'src/app/user/services/user-work-schedule.service';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.scss'],
})
export class UserBookingComponent {
  tab = 'waitBooking';

  items: any[] = [];
  itemsWait: any[] = [];
  itemsDone: any[] = [];
  itemHistory: any[] = [];

  doneNumber = 0;
  waitNumber = 0;

  isLoading = false;
  isDeleting = false;
  itemSelected: any;

  isSelectAll = false;

  constructor(
    private workSchedule: UserWorkScheduleService,
    private el: ElementRef,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getWaitBooking();
    this.getDoneBooking();
    this.getHistoryBooking();
  }

  chooseTab(tab: string): void {
    this.tab = tab;
    if (tab == 'waitBooking') {
      this.items = this.itemsWait;
    } else if (tab == 'doneBooking') {
      this.items = this.itemsDone;
    } else {
      this.items = this.itemHistory;
    }
  }

  getWaitBooking(): void {
    this.isLoading = true;
    this.spinner.show();
    // call API here
    this.workSchedule.getWorkSchedule({ status: 'upcoming' }).subscribe({
      next: ({ data }) => {
        this.isLoading = false;
        this.spinner.hide();
        data.data.forEach((el: any) => {
          el.selected = false;
          if (el.work_schedule_time.date) {
            const myDate = new Date(el.work_schedule_time.date);
            el.day = myDate.getDate();
            const options = { month: 'long' } as Intl.DateTimeFormatOptions;
            const month = new Intl.DateTimeFormat('vi', options).format(myDate);
            el.year = myDate.getFullYear();
            el.month = month;
          }
        });
        this.items = data.data;
        this.itemsWait = data.data;
        this.waitNumber = this.itemsWait.length;
      },
      error: (err) => {
        this.isLoading = false;
        this.spinner.hide();
      },
    });
  }

  getDoneBooking(): void {
    // call API here
    this.workSchedule.getWorkSchedule({ status: 'complete' }).subscribe({
      next: ({ data }) => {
        data.data.forEach((el: any) => {
          el.selected = false;
          if (el.work_schedule_time.date) {
            const myDate = new Date(el.work_schedule_time.date);
            el.day = myDate.getDate();
            const options = { month: 'long' } as Intl.DateTimeFormatOptions;
            const month = new Intl.DateTimeFormat('vi', options).format(myDate);
            el.year = myDate.getFullYear();
            el.month = month;
          }
        });
        this.itemsDone = data.data;
        this.doneNumber = this.itemsDone.length;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  getHistoryBooking(): void {
    // call API here
    this.workSchedule.getWorkSchedule({}).subscribe({
      next: ({ data }) => {
        data.data.forEach((el: any) => {
          el.selected = false;
          if (el.work_schedule_time.date) {
            const myDate = new Date(el.work_schedule_time.date);
            el.day = myDate.getDate();
            const options = { month: 'long' } as Intl.DateTimeFormatOptions;
            const month = new Intl.DateTimeFormat('vi', options).format(myDate);
            el.year = myDate.getFullYear();
            el.month = month;
          }
        });
        this.itemHistory = data.data;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  isAllSelected(): boolean {
    return this.items.every((item) => item.selected);
  }

  toggleSelectAll(): void {
    const allSelected = this.isAllSelected();
    this.items.forEach((item) => (item.selected = !allSelected));
  }

  onCheckAllSelected() {
    this.isSelectAll = !this.isSelectAll;
    // check or uncheck all items
    this.items.forEach((item) => {
      item.checked = this.isSelectAll;
    });
  }

  deleteOne(): void {
    // if (this.itemSelected && this.itemSelected.id) {
    //   this.isDeleting = true;
    //   this.workSchedule.deleteWorkSchedule(this.itemSelected.id).subscribe({
    //     next: () => {
    //       this.getWaitBooking();
    //       this.el.nativeElement.querySelector('#btnCloseModalDelete').click();
    //       this.toastrService.success('Hủy lịch hẹn thành công');
    //     },
    //     error: () => {
    //       this.toastrService.error('Hủy lịch hẹn thất bại');
    //     },
    //   });
    // } else {
    //   this.toastrService.error('Hủy lịch hẹn thất bại');
    //   this.el.nativeElement.querySelector('#btnCloseModalDelete').click();
    // }
    this.el.nativeElement.querySelector('#btnCloseModalDelete').click();
  }
}
