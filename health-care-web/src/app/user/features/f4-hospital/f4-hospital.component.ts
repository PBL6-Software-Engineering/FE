import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from 'src/app/admin/_services/hospital.service';

@Component({
  selector: 'app-f4-hospital',
  templateUrl: './f4-hospital.component.html',
  styleUrls: ['./f4-hospital.component.scss'],
})
export class F4HospitalComponent implements OnInit {
  id: any;
  hospital: any;
  tab = 'info';
  services: any[] = [];
  doctors: any[] = [];
  constructor(
    private hospitalService: HospitalService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.hospitalService
          .viewProfileHospital(this.id)
          .subscribe(({ data }) => {
            this.hospital = data;
          });

        this.hospitalService
          .getHospitalService(this.id)
          .subscribe(({ data }) => {
            this.services = data;
          });

        this.hospitalService
          .getDoctorsOfHospital(this.id)
          .subscribe(({ data }) => {
            this.doctors = data;
          });
      }
    });
  }

  chooseTab(tab: string): void {}
}
