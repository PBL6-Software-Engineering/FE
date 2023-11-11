import { Component, Input, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/admin/_services/hospital.service';
import { prefixApi } from 'src/app/core/constants/api.constant';

@Component({
  selector: 'app-hospital-doctor',
  templateUrl: './hospital-doctor.component.html',
  styleUrls: ['./hospital-doctor.component.scss'],
})
export class HospitalDoctorComponent implements OnInit {
  @Input() hospital: any;
  @Input() doctors: any[] = [];
  // doctors: any[] = [];
  constructor(private hospitalService: HospitalService) {}
  ngOnInit(): void {
  }
}
