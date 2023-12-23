import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { toSlug } from 'src/app/core/libs/library.helper';
@Component({
  selector: 'app-hospital-service',
  templateUrl: './hospital-service.component.html',
  styleUrls: ['./hospital-service.component.scss'],
})
export class HospitalServiceComponent {
  @Input() hospital: any;
  @Input() services: any[];

  constructor(private router: Router) {}

  viewDetailService(service: any): void {
    this.router.navigate([
      '/dich-vu',
      toSlug(service.name),
      service.id_hospital_service,
    ]);
  }
}
