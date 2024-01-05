import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospital-info',
  templateUrl: './hospital-info.component.html',
  styleUrls: ['./hospital-info.component.scss'],
})
export class HospitalInfoComponent implements OnInit {
  @Input() hospital: any;
  @Input() healthInsurances: any[];
  itemSelected : any;
  constructor() {}

  ngOnInit(): void {
  }

  checkIsArray(value: any) {
    if (Array.isArray(value)) {
      return true;
    }
    return false;
  }
}
