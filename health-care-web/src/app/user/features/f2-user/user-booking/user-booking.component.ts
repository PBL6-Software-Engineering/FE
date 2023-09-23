import { Component } from '@angular/core';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.scss']
})
export class UserBookingComponent {
  tab = 'waitBooking';
  items: any[] = [];
  number = 0;
  constructor() {

  }
  ngOnInit(): void {
    // call API here
    this.getWaitBooking();
    this.number = this.items.length;
  } 

  chooseTab(tab: string): void {
    this.tab = tab;
  }

  getWaitBooking(): void {
    // call API here
  }

  getDoneBooking(): void {
    // call API here
  }

  getHistoryBooking(): void {
    // call API here
  }
}
