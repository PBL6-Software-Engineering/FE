import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/admin/_services/booking.service';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.css'],
})
export class UserRatingComponent {
  @Input() workSchedule: any;
  @Output() onRatingSuccess = new EventEmitter<number>();

  number_rating: number = 0;
  detail_rating: string = '';
  isSaving = false;

  constructor(
    private toastr: ToastrService,
    private bookingService: BookingService,
    private el: ElementRef,
  ) {}

  resetRating() {
    this.number_rating = 0;
    this.detail_rating = '';
  }

  onRatingChange(rating: any) {
    this.number_rating = rating;
    console.log('ratingChanged', this.number_rating);
  }

  saveRating() {
    if (this.number_rating > 0) {
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
    } else {
      this.toastr.warning('Bạn chưa đánh giá lịch hẹn!');
    }
  }
}
