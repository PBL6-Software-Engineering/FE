import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-hospital-service',
  templateUrl: './hospital-service.component.html',
  styleUrls: ['./hospital-service.component.scss'],
})
export class HospitalServiceComponent {
  @Input() hospital: any;
  @Input() services: any[];

  constructor() {}
}
