import { Component, Input, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/admin/_services/hospital.service';

@Component({
  selector: 'app-hospital-service',
  templateUrl: './hospital-service.component.html',
  styleUrls: ['./hospital-service.component.scss'],
})
export class HospitalServiceComponent implements OnInit {
  @Input() hospital: any;
  @Input() services: any[] = [];

  constructor(private hospitalService: HospitalService) {}
  ngOnInit(): void {
  }
}
