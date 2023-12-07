import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/admin/_services/booking.service';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css'],
})
export class ConfirmBookingComponent implements OnInit {
  @Input() dataBooking: any;
  @Input() hospital: any;
  @Output() goToStep1 = new EventEmitter<any>();
  isBooking: boolean = false;
  isLogin: boolean = false;
  user: any;

  form: any;
  constructor(
    private bookingService: BookingService,
    private toastr: ToastrService,
    private router: Router,
    private tokenStorage: TokenStorageService,
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      name_patient: new FormControl('', [Validators.required]),
      date_of_birth_patient: new FormControl(null, [Validators.required]),
      gender_patient: new FormControl('', [Validators.required]),
      email_patient: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
      phone_patient: new FormControl('', [
        Validators.required,
        Validators.pattern(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
      ]),
      address_patient: new FormControl('', []),
      health_condition: new FormControl('', [Validators.required]),
    });
    window.scrollTo(0, 0);

    this.tokenStorage.getUser().subscribe((user: any) => {
      if (user) {
        this.isLogin = true;
        this.user = user;
      }
    });
  }

  confirmBooking(): void {
    if (this.form.valid) {
      this.isBooking = true;
      if (this.dataBooking.doctor) {
        this.bookDoctor();
      } else {
        this.bookService();
      }
    } else {
      this.toastr.warning('Vui lòng điền đầy đủ thông tin!');
    }
  }

  onGoToStep1(): void {
    this.goToStep1.emit();
  }

  bookDoctor(): void {
    const data = {
      id_doctor: this.dataBooking?.doctor?.id_doctor,
      time: {
        date: this.dataBooking.time.date,
        interval: this.dataBooking.time.interval,
      },
      ...this.form.value,
    };
    this.bookingService.bookDoctor(data).subscribe({
      next: (res) => {
        this.isBooking = false;
        this.toastr.success('Đặt lịch hẹn thành công!');
        this.router.navigateByUrl('/user/booking');
      },
      error: (err) => {
        this.isBooking = false;
        this.toastr.error('Đặt lịch hẹn thất bại!');
      },
    });
  }

  bookService(): void {
    const data = {
      id_hospital_service: this.dataBooking.hospitalService.id_hospital_service,
      time: {
        date: this.dataBooking.time.date,
        interval: this.dataBooking.time.interval,
      },
      ...this.form.value,
    };
    this.bookingService.bookService(data).subscribe({
      next: (res) => {
        this.isBooking = false;
        this.toastr.success('Đặt lịch hẹn thành công!');
        this.router.navigateByUrl('/user/booking');
      },
      error: (err) => {
        this.isBooking = false;
        this.toastr.error('Đặt lịch hẹn thất bại!');
      },
    });
  }

  autoFillInfoLogin() {
    if (this.user) {
      const obj = {
        name_patient: this.user.name,
        gender_patient: this.user.gender,
        email_patient: this.user.email,
        phone_patient: this.user.phone,
        address_patient: this.user.address,
        date_of_birth_patient: this.user.date_of_birth,
      };
      this.form.patchValue(obj);
    }
  }
}
