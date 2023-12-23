import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BookingService } from 'src/app/admin/_services/booking.service';

@Component({
  selector: 'app-booking-service',
  templateUrl: './booking-service.component.html',
  styleUrls: ['./booking-service.component.scss'],
})
export class BookingServiceComponent implements OnChanges {
  @Input() service: any;
  @Output() confirmBooking = new EventEmitter<any>();

  isGetTime: boolean = false;
  isErrorGetTime: boolean = false;
  isBooking: boolean = false;
  isErrorBooking: boolean = false;

  departmentsOfHospital: any[] = [];
  doctors: any[] = [];

  responsiveOptions: any[] = [];

  department: any;

  times: any;
  day: any;
  dayName: any;
  session: any = 'morning';
  diviseTime: any;

  constructor(
    private bookingService: BookingService,
    private snipperService: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.service && this.service.id_hospital_service) {
      this.getTimeWorkService();
    }
  }

  getTimeWorkService() {
    this.times = [];
    this.isGetTime = true;
    this.isErrorGetTime = false;
    this.isErrorBooking = false;
    this.day = {};
    this.diviseTime = [];
    this.dayName = '';
    this.snipperService.show();
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
          this.snipperService.hide();
        },
        error: (err) => {
          this.isGetTime = false;
          this.isErrorGetTime = true;
          this.snipperService.hide();
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

    console.log(this.times);
    this.cdr.detectChanges();
  }

  onConfirmBook(): void {
    let dataBooking: any = {
      time: {
        date: this.day.date,
        interval: this.diviseTime,
      },
    };
    dataBooking.service = this.service;
    this.confirmBooking.emit(dataBooking);
  }
}
