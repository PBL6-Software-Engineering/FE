import {
  Component,
  EventEmitter,
  OnInit,
  Output, ViewEncapsulation,
} from '@angular/core';
import flatpickr from 'flatpickr';
import {DatePipe} from "@angular/common";
import {startOfISOWeek, endOfISOWeek, subWeeks, startOfMonth, subMonths, endOfMonth} from 'date-fns';

@Component({
  selector: 'app-f4-log-filter',
  templateUrl: './f4-log-filter.component.html',
  styleUrls: ['./f4-log-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class F4LogFilterComponent implements OnInit {
  currentDate: Date = new Date();
  datePipe = new DatePipe('en-US');

  // output
  // output cho button hôm nay, hôm qua
  @Output() oneDateClick = new EventEmitter<string>();

  // output cho button tuần trước, tháng trước, khoảng thời gian
  @Output() onMultiDateClick = new EventEmitter<string>();

  // binding
  previousDate = new Date();

  // flatpickr
  dateRangeFlatPickr: any;

  // date display in filter
  dateDisplay: any;

  /**
   * constructor
   */
  constructor() {
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.dateDisplay = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    this.dateRangeFlatPickr = flatpickr('#dateRange', {
      dateFormat: 'd-m-Y',
      mode: "range",
      locale: 'vn',
      onClose: (dateRanges) => {
        const startDate = new Date(dateRanges[0]);
        const endDate = new Date(dateRanges[1]);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        const dateResult = `${startDate}-${endDate}`;
        const startDateFormatted = this.datePipe.transform(startDate, 'dd/MM/yyyy');
        const endDateFormatted = this.datePipe.transform(endDate, 'dd/MM/yyyy');
        this.dateDisplay = `${startDateFormatted} - ${endDateFormatted}`;
        this.onMultiDateClick.emit(dateResult);
      }
    });
  }

  /**
   * onPreviousDateClick
   */
  onPreviousDateClick() {

    // Nếu hôm nay là ngày đầu tiên của năm
    if (this.currentDate.getDate() === 1 && this.currentDate.getMonth() === 0) {
      this.previousDate.setFullYear(this.currentDate.getFullYear() - 1);
      this.previousDate.setMonth(11);
      this.previousDate.setDate(this.daysInMonth(12, this.currentDate.getFullYear()));
    } else if (this.currentDate.getDate() === 1) { // Nếu hôm nay là ngày đầu tiên của tháng
      this.previousDate.setMonth(this.currentDate.getMonth() - 1);
      this.previousDate.setDate(this.daysInMonth(this.currentDate.getMonth() + 1,
        this.currentDate.getFullYear()));
    } else {
      this.previousDate.setDate(this.currentDate.getDate() - 1);
    }
    this.dateDisplay = this.datePipe.transform(this.previousDate, 'dd/MM/yyyy');
    ;
    this.oneDateClick.emit(this.previousDate != null ? this.previousDate.toDateString() : '');
  }

  /**
   * onCurrentDateClick
   */
  onCurrentDateClick() {
    this.oneDateClick.emit(this.currentDate != null ? this.currentDate.toDateString() : '');
    this.currentDate.setHours(0, 0, 0, 0);
    this.dateDisplay = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
  }

  /**
   * daysInMonth
   */
  daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  /**
   * onPreviousWeekClick
   */
  onPreviousWeekClick() {
    const startOfLastWeek = startOfISOWeek(subWeeks(this.currentDate, 1));
    const endOfLastWeek = endOfISOWeek(startOfLastWeek);
    const dateResult = `${startOfLastWeek} - ${endOfLastWeek}`;
    this.dateDisplay = 'Tuần trước';
    this.onMultiDateClick.emit(dateResult !== '' ? dateResult : '');
  }

  /**
   * onPreviousMonthClick
   */
  onPreviousMonthClick() {
    const startOfLastMonth = startOfMonth(subMonths(this.currentDate, 1));
    const endOfLastMonth = endOfMonth(startOfLastMonth);
    const dateResult = `${startOfLastMonth}-${endOfLastMonth}`;
    this.dateDisplay = 'Tháng trước';
    this.onMultiDateClick.emit(dateResult !== '' ? dateResult : '');
  }

  /**
   * onFromDateClick
   */
  onFromDateClick() {
    this.dateRangeFlatPickr.open();
  }
}
