import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/admin/_services/booking.service';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.css'],
})
export class UserRatingComponent implements OnChanges {
  @Input() workSchedule: any;
  @Input() isCanEdit: boolean = false;
  @Output() onRatingSuccess = new EventEmitter<number>();

  isSaving = false;
  number_rating: number = 0;
  detail_rating: string = '';

  constructor(
    private toastr: ToastrService,
    private bookingService: BookingService,
    private el: ElementRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workSchedule && this.workSchedule.rating) {
      this.number_rating = this.workSchedule.rating.number_rating;
      this.detail_rating = this.workSchedule.rating.detail_rating;
    } else {
      this.number_rating = 0;
      this.detail_rating = '';
    }
  }

  onRatingChange(rating: any) {
    this.number_rating = rating;
  }

  saveRating() {
    if (this.number_rating > 0) {
      if (this.workSchedule && this.workSchedule.rating) {
        this.updateRating();
      } else {
        this.addRating();
      }
    } else {
      this.toastr.warning('Bạn chưa đánh giá lịch hẹn!');
    }
  }

  addRating() {
    this.isSaving = true;
    this.bookingService
      .addRating({
        id_work_schedule: this.workSchedule.work_schedule_id,
        number_rating: this.number_rating,
        detail_rating: this.detail_rating,
      })
      .subscribe({
        next: ({ data }) => {
          this.onRatingSuccess.emit(data);
          this.el.nativeElement.querySelector('#dismissRating').click();
          this.isSaving = false;
          this.toastr.success('Đánh giá lịch hẹn thành công!');
        },
        error: ({ error }) => {
          this.toastr.error(error.message || 'Đánh giá lịch hẹn thất bại!');
          this.isSaving = false;
        },
      });
  }

  updateRating() {
    this.isSaving = true;
    const data = {
      number_rating: this.number_rating,
      detail_rating: this.detail_rating,
    };
    this.bookingService
      .updateRating(this.workSchedule.rating.id, data)
      .subscribe({
        next: ({ data }) => {
          this.onRatingSuccess.emit(data);
          this.el.nativeElement.querySelector('#dismissRating').click();
          this.isSaving = false;
          this.toastr.success('Cập nhật lịch hẹn thành công!');
        },
        error: ({ error }) => {
          this.toastr.error(error.message || 'Cập nhật lịch hẹn thất bại!');
          this.isSaving = false;
        },
      });
  }
}
