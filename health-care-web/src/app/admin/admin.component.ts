import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    const province = this.route.snapshot.data['province'];
    if (province && province.provinces) {
      localStorage.setItem('provinces', JSON.stringify(province.provinces));
    }
  }
}
