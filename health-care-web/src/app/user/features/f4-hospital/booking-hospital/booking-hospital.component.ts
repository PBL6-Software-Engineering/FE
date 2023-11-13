import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/admin/_services/booking.service';
import { DepartmentHospitalService } from 'src/app/admin/_services/department_hospital.service';
import { HospitalService } from 'src/app/admin/_services/hospital.service';

@Component({
  selector: 'app-booking-hospital',
  templateUrl: './booking-hospital.component.html',
  styleUrls: ['./booking-hospital.component.scss'],
})
export class BookingHospitalComponent implements OnInit, OnChanges {
  @Input() hospital: any;
  @Input() doctorsOfHospital: any[] = [];
  @Input() services: any[] = [];

  tab: any = 'doctor';
  isGetTime: boolean = false;
  isErrorGetTime: boolean = false;
  isBooking: boolean = false;
  isErrorBooking: boolean = false;

  departmentsOfHospital: any[] = [];
  doctors: any[] = [];

  responsiveOptions: any[] = [];

  department: any;
  doctor: any;
  service: any;

  times: any;
  day: any;
  dayName: any;
  session: any = 'morning';
  diviseTime: any;

  constructor(
    private departmentHospitalService: DepartmentHospitalService,
    private bookingService: BookingService,
    private spinnerService: NgxSpinnerService,
    private el: ElementRef,
    private toastr: ToastrService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.hospital && this.hospital.id_hospital) {
      if (this.hospital && this.hospital.id_hospital) {
        this.departmentHospitalService
          .getDepartmentsOfHospital(this.hospital.id_hospital)
          .subscribe(({ data }) => {
            this.departmentsOfHospital = data;
          });
      }
    }
    this.doctors = this.doctorsOfHospital;
  }
  ngOnInit(): void {
    if (this.hospital && this.hospital.id_hospital) {
      this.departmentHospitalService
        .getDepartmentsOfHospital(this.hospital.id_hospital)
        .subscribe(({ data }) => {
          this.departmentsOfHospital = data;
        });
    }
  }

  onChangeDepartment() {
    console.log('doctorsOfHospital', this.doctorsOfHospital);
    console.log('department', this.department);
    this.doctors = this.doctorsOfHospital.filter(
      (doctor) =>
        doctor.name_department === this.department.name
    );
  }

  getTimeWorkDoctor() {
    this.times = [];
    this.isGetTime = true;
    this.isErrorGetTime = false;
    this.spinnerService.show();
    this.bookingService.getTimeWorkDoctor(this.doctor.id_doctor).subscribe({
      next: ({ data }) => {
        this.isGetTime = false;
        this.isErrorGetTime = false;
        if (data.enable) {
          this.times = data.times;
          this.processTimes();
        } else {
          this.times = [];
        }
        this.spinnerService.hide();
      },
      error: (err) => {
        this.isGetTime = false;
        this.isErrorGetTime = true;
        this.spinnerService.hide();
      },
    });
  }

  getTimeWorkService() {
    this.times = [];
    this.isGetTime = true;
    this.isErrorGetTime = false;
    this.spinnerService.show();
    this.bookingService
      .getTimeWorkService(this.service.id_hospital_service)
      .subscribe({
        next: ({ data }) => {
          this.isGetTime = false;
          this.isErrorGetTime = false;
          if (data.enable) {
            this.times = data.times;
            this.processTimes();
          } else {
            this.times = [];
          }
          this.spinnerService.hide();
        },
        error: (err) => {
          this.isGetTime = false;
          this.isErrorGetTime = true;
          this.spinnerService.hide();
        },
      });
  }

  chooseTime(time: any): void {
    this.day = time.time;
    this.dayName = time.name;
  }

  processTimes(): void {
    const timesOrder = [];
    const days = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
    const daysVietnamese = [
      'Thứ hai',
      'Thứ ba',
      'Thứ tư',
      'Thứ năm',
      'Thứ sáu',
      'Thứ bảy',
      'Chủ nhật',
    ];
    for (let i = 0; i < 7; i++) {
      const day = days[i];
      if (this.times[day].enable) {
        const tmp = {
          name: daysVietnamese[i],
          time: this.times[day],
        };

        timesOrder.push(tmp);
      }
    }
    this.times = timesOrder;
  }

  bookDoctor(): void {
    this.bookingService
      .bookDoctor(this.doctor.id_doctor, {
        date: this.day.date,
        interval: this.diviseTime,
      })
      .subscribe({
        next: (res) => {
          this.isBooking = false;
          this.isErrorBooking = false;
          this.el.nativeElement.querySelector('#closeModalBooking').click();
          this.toastr.success('Đặt lịch hẹn thành công!');
        },
        error: (err) => {
          this.isBooking = false;
          this.isErrorBooking = true;
          this.toastr.error('Đặt lịch hẹn thất bại!');
        },
      });
  }

  bookService(): void {
    this.bookingService
      .bookService(this.service.id_hospital_service, {
        date: this.day.date,
        interval: this.diviseTime,
      })
      .subscribe({
        next: (res) => {
          this.isBooking = false;
          this.isErrorBooking = false;
          this.el.nativeElement.querySelector('#closeModalBooking').click();
          this.toastr.success('Đặt lịch hẹn thành công!');
        },
        error: (err) => {
          this.isBooking = false;
          this.isErrorBooking = true;
          this.toastr.error('Đặt lịch hẹn thất bại!');
        },
      });
  }

  book(): void {
    this.isBooking = true;
    this.isErrorBooking = false;
    if (this.tab === 'doctor') {
      this.bookDoctor();
    } else {
      this.bookService();
    }
  }
}
