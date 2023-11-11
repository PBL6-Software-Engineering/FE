import { Component } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-banner-search',
  templateUrl: './banner-search.component.html',
  styleUrls: ['./banner-search.component.scss'],
})
export class BannerSearchComponent {
  province: any;
  provinces: any[] = [];

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.getProvinces();
  }

  getProvinces() {
    this.commonService.getProvinces().subscribe((data) => {
      this.provinces = data.provinces;
    });
  }
}
