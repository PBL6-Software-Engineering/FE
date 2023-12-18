import { Component, ElementRef, OnInit } from '@angular/core';
import { AppointmentService } from '../../_services/appointment.service';
import { getStartAndEndDateOfWeek } from 'src/app/core/libs/library.helper';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-appointment-hospital',
  templateUrl: './appointment-hospital.component.html',
  styleUrls: ['./appointment-hospital.component.scss'],
})
export class AppointmentHospitalComponent implements OnInit {
  type: string = 'table'; // 'calendar'
  dataSources: any[] = [];
  appointmentsOfWeek: any[] = [];

  currentPage = 1;
  totalPage = 0;
  totalElements = 0;
  numberElementOfPage = 0;

  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isErrorGetData: boolean = false;

  isSearching = false;
  isLoading = false;
  isCancling = false;
  isSpecifying = false;
  isConfirm = false;
  isGetDoctorSpecify = false;
  isErrorCancle = false;

  selectedItem: any;

  doctorsSpecify: any[] = [];
  isEmptyDoctorSpecify: boolean = false;
  idDoctorSpecify: any;

  // FILTER
  filter: any = {
    // name, address, email, phone of user
    // OR name, email, phone, address of patient OR hospital_services.name OR work_schedules.content
    search: '',
    paginate: 20,
    page: 1,
    is_service: '', // 'advise' OR 'service' OR 'not_specified' OR 'has_specified' OR ''
    typesort: 'new', // new , name , price , time
    start_date: null, // 2023-11-05
    end_date: null, // 2023-11-05,
    is_confirm: 'both', // 0 , 1 , "both" // select option
    status: '', // '' OR complete OR upcoming
  };

  constructor(
    private appoinrmentService: AppointmentService,
    private el: ElementRef,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData(): void {
    this.isLoading = true;
    this.spinnerService.show();

    if (!this.filter.start_date) {
      const { startDate, endDate } = getStartAndEndDateOfWeek();
      this.filter.start_date = startDate;
      this.filter.end_date = endDate;
    }
    const query: any = {};
    Object.keys(this.filter).forEach((key) => {
      if (this.filter[key] !== null) {
        query[key] = this.filter[key];
      }
    });
    this.appoinrmentService.getAppointmentHospital(query).subscribe({
      next: ({ data }) => {
        this.dataSources = data.data;
        this.appointmentsOfWeek = data.data;
        this.isLoading = false;
        this.spinnerService.hide();

        this.currentPage = data.current_page; // trang hiện tại
        this.totalPage = data.last_page; // số trang
        this.totalElements = data.total; // tổng số phần tử trong database
        this.numberElementOfPage = this.dataSources.length; // số phần tử của 1 trang
      },
      error: () => {
        this.isLoading = false;
        this.spinnerService.hide();
      },
    });
  }

  onChangePage(page: number) {
    this.filter.page = page;
    this.onLoadData();
  }

  onCancleAppointment(): void {
    this.isCancling = true;
    this.isErrorCancle = false;
    this.appoinrmentService
      .cancleAppointment(this.selectedItem.work_schedule_id)
      .subscribe({
        next: () => {
          this.isCancling = false;
          this.isErrorCancle = false;
          this.onLoadData();
          this.el.nativeElement.querySelector('#dismissCancleModal').click();
          this.toastrService.success('Huỷ lịch hẹn thành công!');
        },
        error: () => {
          this.isCancling = false;
          this.isErrorCancle = true;
          this.toastrService.error('Huỷ lịch hẹn thất bại!');
          // this.isCancling = false;
          // this.isErrorCancle = false;
          // this.onLoadData();
          // this.el.nativeElement.querySelector('#dismissCancleModal').click();
          // this.toastrService.success('Huỷ lịch hẹn thành công!');
        },
      });
  }

  confirmAppointment(): void {
    this.isConfirm = true;
    this.appoinrmentService
      .confirmAppointment(
        this.selectedItem.work_schedule_id,
        this.selectedItem.work_schedule_is_confirm ? 0 : 1,
      )
      .subscribe({
        next: () => {
          this.el.nativeElement.querySelector('#dismissConfirmBooking').click();
          this.toastrService.success('Thành công!');
          this.onLoadData();
          this.isConfirm = false;
        },
        error: () => {
          this.toastrService.error('Thất bại!');
          this.el.nativeElement.querySelector('#closeModalShowInfo').click();
          this.isConfirm = false;
        },
      });
  }

  openModalShowInfo(item: any): void {
    this.selectedItem = item;
    this.el.nativeElement.querySelector('#btnOpenModalShowInfo').click();
  }

  onChangePageSize(pageSize: any) {
    this.currentPage = 1;
    this.filter.paginate = pageSize;
    this.onLoadData();
  }
}
