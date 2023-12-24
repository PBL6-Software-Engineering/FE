import { Component, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';

@Component({
  selector: 'app-f1-dashboard',
  templateUrl: './f1-dashboard.component.html',
  styleUrls: ['./f1-dashboard.component.scss'],
})
export class F1DashboardComponent implements OnInit {
  role: any;

  constructor(private tokenService: TokenStorageService) {}

  ngOnInit(): void {
    flatpickr('#dateFilter', {
      allowInput: true,
      mode: 'range',
      dateFormat: 'd-m-Y',
      minDate: new Date('01/01/1900'),
      maxDate: new Date(),
      defaultDate: ['2023-12-01', '2023-12-31'],
    });

    this.role = this.tokenService.getRole();
  }
}
