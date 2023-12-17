import { Component } from '@angular/core';
import { HospitalService } from 'src/app/user/services/hospital.service';
import { ExpertService } from 'src/app/user/services/expert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-banner-search',
  templateUrl: './banner-search.component.html',
  styleUrls: ['./banner-search.component.scss'],
})
export class BannerSearchComponent {
  province: any;
  provinces: any[] = [];
  textSearch = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.provinces = JSON.parse(localStorage.getItem('provinces') || '[]');
  }

  search(): void {
    this.router.navigate(['/tim-kiem', this.textSearch || '']);
  }
}
