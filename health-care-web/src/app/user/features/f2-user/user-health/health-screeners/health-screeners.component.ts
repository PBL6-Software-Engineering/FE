import { Component } from '@angular/core';

@Component({
  selector: 'app-health-screeners',
  templateUrl: './health-screeners.component.html',
  styleUrls: ['./health-screeners.component.scss']
})
export class HealthScreenersComponent {
  list = [
    { id: 1, title: 'Công cụ sàng lọc tầm soát bệnh tim mạch' },
    { id: 2, title: 'Công cụ sàng lọc tầm soát bệnh tim mạch' },
    { id: 3, title: 'Công cụ sàng lọc tầm soát bệnh tim mạch' },
  ]
  constructor() {
    
  }
}
