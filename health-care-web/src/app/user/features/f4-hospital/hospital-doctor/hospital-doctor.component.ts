import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospital-doctor',
  templateUrl: './hospital-doctor.component.html',
  styleUrls: ['./hospital-doctor.component.scss'],
})
export class HospitalDoctorComponent implements OnInit {
  @Input() hospital: any;
  @Input() doctors: any[] = [];
  constructor() {}
  ngOnInit(): void {}
}
