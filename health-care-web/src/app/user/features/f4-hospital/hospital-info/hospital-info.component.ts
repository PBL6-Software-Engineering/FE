import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospital-info',
  templateUrl: './hospital-info.component.html',
  styleUrls: ['./hospital-info.component.scss'],
})
export class HospitalInfoComponent implements OnInit {
  @Input() hospital: any;

  constructor() {}
  
  ngOnInit(): void {
  }
}
