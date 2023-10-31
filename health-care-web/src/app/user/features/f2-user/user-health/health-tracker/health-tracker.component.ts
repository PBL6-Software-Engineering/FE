import { Component, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';

@Component({
  selector: 'app-health-tracker',
  templateUrl: './health-tracker.component.html',
  styleUrls: ['./health-tracker.component.scss']
})
export class HealthTrackerComponent implements OnInit {
  dateRangeFlatPickr: any;
  activityMode: string = 'low';
  noteActivityMode: string = 'Cường độ Ít';
  user: any;

  constructor(private tokenStorageService: TokenStorageService) {
    this.tokenStorageService.getUser().subscribe((user: any) => user = user);
  }
  ngOnInit(): void {
    this.dateRangeFlatPickr = flatpickr('#dateOfBirthPicker', {
      allowInput: true,
      dateFormat: 'd-m-Y',
      minDate: new Date('01/01/1900'),
      maxDate: new Date(),
    });
  }  

  changeActivityMode(mode: string): void {
    this.activityMode = mode;
    switch (mode) {
      case 'low':
        this.noteActivityMode = 'Cường độ Ít';
        break;
      case 'moderate':
        this.noteActivityMode = 'Cường độ Trung bình';
        break;
      case 'aerobic':
        this.noteActivityMode = 'Cường độ Khá';
        break;
      case 'vigorous':
        this.noteActivityMode = 'Cường độ Nhiều';
        break;
      case 'max':
        this.noteActivityMode = 'Cường độ Tối đa';
        break;
    }
  }
} 
