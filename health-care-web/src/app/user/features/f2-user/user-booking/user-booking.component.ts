import { Component, ElementRef, Renderer2 } from '@angular/core';
import { UserWorkScheduleService } from '../../services/user-work-schedule.service';
import { ToastrService } from 'ngx-toastr';
import { prefixApi } from 'src/app/core/constants/api.constant';

import { FormsModule } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.scss'],
})
export class UserBookingComponent {
  tab = 'waitBooking';
  delId = 0;
  // delIdArray: any[]=[];
  items: any[] = [];
  doneNumber = 0;
  waitNumber = 0;
  constructor(
    private workSchedule: UserWorkScheduleService,
    private el: ElementRef,
    private renderer: Renderer2,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getWaitBooking();
    this.workSchedule.getWorkSchedule({ status: 'complete' }).subscribe({
      next: ({ data }) => {
        this.doneNumber = data.data.length;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  chooseTab(tab: string): void {
    this.tab = tab;
    if (tab == 'waitBooking') {
      this.getWaitBooking();
    } else if (tab == 'doneBooking') {
      this.getDoneBooking();
    } else {
      this.getHistoryBooking();
    }
  }

  getWaitBooking(): void {
    // call API here
    this.workSchedule.getWorkSchedule({ status: 'upcoming' }).subscribe({
      next: ({ data }) => {
        console.log(data);
        data.data.forEach((element: any) => {
          element.selected = false;
          const myDate = new Date(element.work_schedule_time.date);
          element.day = myDate.getDate();
          const options = { month: 'long' } as Intl.DateTimeFormatOptions;
          const month = new Intl.DateTimeFormat('en-US', options).format(
            myDate
          );
          element.year = myDate.getFullYear();
          element.month = month;

          if (element.doctor_avatar) {
            element.doctor_avatar = prefixApi + '/' + element.doctor_avatar;
          } else {
            element.doctor_avatar = '/assets/media/image/default-doctor.jpg';
          }
          if (element.hospital_avatar) {
            element.hospital_avatar = prefixApi + '/' + element.hospital_avatar;
          } else {
            element.hospital_avatar =
              '/assets/media/image/Default-hospital.jpg';
          }

          if (element.department_thumbnail) {
            element.department_thumbnail =
              prefixApi + '/' + element.department_thumbnail;
          } else {
            element.department_thumbnail =
              '/assets/media/image/Default-hospital.jpg';
          }
        });
        this.items = data.data;
        this.waitNumber = this.items.length;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  getDoneBooking(): void {
    // call API here
    this.workSchedule.getWorkSchedule({ status: 'complete' }).subscribe({
      next: ({ data }) => {
        console.log(data);
        data.data.forEach((element: any) => {
          element.selected = false;
          const myDate = new Date(element.work_schedule_time.date);
          element.day = myDate.getDate();
          const options = { month: 'long' } as Intl.DateTimeFormatOptions;
          const month = new Intl.DateTimeFormat('en-US', options).format(
            myDate
          );
          element.year = myDate.getFullYear();
          element.month = month;

          if (element.doctor_avatar) {
            element.doctor_avatar = prefixApi + '/' + element.doctor_avatar;
          } else {
            element.doctor_avatar = '/assets/media/image/default-doctor.jpg';
          }
          if (element.hospital_avatar) {
            element.hospital_avatar = prefixApi + '/' + element.hospital_avatar;
          } else {
            element.hospital_avatar =
              '/assets/media/image/Default-hospital.jpg';
          }

          if (element.department_thumbnail) {
            element.department_thumbnail =
              prefixApi + '/' + element.department_thumbnail;
          } else {
            element.department_thumbnail =
              '/assets/media/image/Default-hospital.jpg';
          }
        });
        this.items = data.data;
        this.doneNumber = this.items.length;
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
        console.log(data);
        data.data.forEach((element: any) => {
          element.selected = false;
          const myDate = new Date(element.work_schedule_time.date);
          element.day = myDate.getDate();
          const options = { month: 'long' } as Intl.DateTimeFormatOptions;
          const month = new Intl.DateTimeFormat('en-US', options).format(
            myDate
          );
          element.year = myDate.getFullYear();
          element.month = month;

          if (element.doctor_avatar) {
            element.doctor_avatar = prefixApi + '/' + element.doctor_avatar;
          } else {
            element.doctor_avatar = '/assets/media/image/default-doctor.jpg';
          }
          if (element.hospital_avatar) {
            element.hospital_avatar = prefixApi + '/' + element.hospital_avatar;
          } else {
            element.hospital_avatar =
              '/assets/media/image/Default-hospital.jpg';
          }

          if (element.department_thumbnail) {
            element.department_thumbnail =
              prefixApi + '/' + element.department_thumbnail;
          } else {
            element.department_thumbnail =
              '/assets/media/image/Default-hospital.jpg';
          }
        });
        this.items = data.data;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  showDetail(event: MouseEvent): void {
    var clickedElement = event.target as HTMLElement;
    console.log(this.items);
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == clickedElement.id) {
        if (this.items[i].service_name) {
          console.log(this.items[i]);
          var detailModalLabel =
            this.el.nativeElement.querySelector('#detailModalLabel');
          detailModalLabel.innerText = this.items[i].service_name;
          this.items[i].service_infor.about_service;
          var aboutService =
            this.el.nativeElement.querySelector('#aboutService');
          aboutService.innerHTML = this.items[i].service_infor.about_service;
          var prepareProcess =
            this.el.nativeElement.querySelector('#prepareProcess');
          prepareProcess.innerHTML =
            this.items[i].service_infor.prepare_process;
          var serviceDetails =
            this.el.nativeElement.querySelector('#serviceDetails');
          serviceDetails.innerHTML =
            this.items[i].service_infor.prepare_process;
          break;
        } else {
          this.el.nativeElement
            .querySelector('#service-container')
            .classList.add('d-none');
          var detailModalLabel =
            this.el.nativeElement.querySelector('#detailModalLabel');
          detailModalLabel.innerText = 'Lịch tư vấn';
          var detail = this.el.nativeElement.querySelector('#detail');
          detail.innerText = this.items[i].work_schedule_content;
        }
      }
    }
  }
  saveID(id: any) {
    this.delId = id;
  }
  areAllSelected(): boolean {
    return this.items.every((item) => item.selected);
  }
  toggleSelectAll(): void {
    const allSelected = this.areAllSelected();
    this.items.forEach((item) => (item.selected = !allSelected));
  }
  delete(): void {
    var loading = this.el.nativeElement.querySelector('#loading');
    this.renderer.removeClass(loading, 'd-none');

    this.workSchedule.deleteWorkSchedule(this.delId.toString()).subscribe({
      next: () => {
        this.getWaitBooking();
        const deleteButton = this.el.nativeElement.querySelector('#delete-btn');
        if (deleteButton) {
          this.renderer.selectRootElement(deleteButton).click();
        }
        this.renderer.addClass(loading, 'd-none');
        this.toastrService.success('Hủy lịch hẹn thành công');
      },
      error: (err) => {
        this.toastrService.error('Hủy lịch hẹn thất bại');
        this.renderer.addClass(loading, 'd-none');
        console.log('Error', err);
      },
    });
  }

  deleteMany(): void {
    // this.delIdArray = this.items
    //   .filter((item) => item.selected)
    //   .map((item) => item.id);
    var loading = this.el.nativeElement.querySelector('#loading-2');
    if (this.items.some((item) => item.selected)) {
      this.renderer.removeClass(loading, 'd-none');
      this.workSchedule
        .deleteManyWorkSchedule(
          this.items.filter((item) => item.selected).map((item) => item.id)
        )
        .subscribe({
          next: () => {
            const deleteButton =
              this.el.nativeElement.querySelector('#delete-btn-2');
            if (deleteButton) {
              this.renderer.selectRootElement(deleteButton).click();
            }
            this.renderer.addClass(loading, 'd-none');
            this.toastrService.success('Hủy lịch hẹn thành công');
            this.getWaitBooking();
          },
          error: (error) => {
            this.renderer.addClass(loading, 'd-none');
            this.toastrService.error('Hủy lịch hẹn thất bại');
            console.log('Error', error);
          },
        });
    } else {
      this.toastrService.error('Không có lịch nào được chọn');
      var deleteButton = this.el.nativeElement.querySelector('#delete-btn-2');
      if (deleteButton) {
        this.renderer.selectRootElement(deleteButton).click();
        deleteButton.innerText = 'Đóng';
      }
    }
    // console.log('Selected IDs:', this.delIdArray);
  }
}
