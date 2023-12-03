import { Component } from '@angular/core';

@Component({
  selector: 'app-banner-search',
  templateUrl: './banner-search.component.html',
  styleUrls: ['./banner-search.component.scss'],
})
export class BannerSearchComponent {
  province: any;
  provinces: any[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log('provinces', this.provinces);
    this.provinces = JSON.parse(localStorage.getItem('provinces') || '[]');
    console.log('provinces', this.provinces);
  }
}
