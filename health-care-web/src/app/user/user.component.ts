import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const category = this.route.snapshot.data['category'];
    const department = this.route.snapshot.data['department'];
    const articleOutstanding = this.route.snapshot.data['articleOutstanding'];
    const province = this.route.snapshot.data['province'];
    const hospitalOutStanding = this.route.snapshot.data['hospitalOutStanding'];

    localStorage.setItem(
      'categories',
      JSON.stringify(category ? category.data || '[]' : '[]')
    );
    localStorage.setItem(
      'departments',
      JSON.stringify(department ? department.data || '[]' : '[]')
    );
    localStorage.setItem(
      'articlesOutstanding',
      JSON.stringify(
        articleOutstanding ? articleOutstanding.data.data || '[]' : '[]'
      )
    );
    localStorage.setItem(
      'hospitalsOutStanding',
      JSON.stringify(
        hospitalOutStanding ? hospitalOutStanding.data.data || '[]' : '[]'
      )
    );
    localStorage.setItem(
      'provinces',
      JSON.stringify(province ? province.provinces || '[]' : '[]')
    );
  }
}
