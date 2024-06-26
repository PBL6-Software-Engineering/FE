import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isOpenChatGpt = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const [province, category, department] =
      this.route.snapshot.data['commonData'];
    localStorage.setItem(
      'provinces',
      JSON.stringify(province.provinces || '[]'),
    );
    localStorage.setItem('categories', JSON.stringify(category.data || '[]'));
    localStorage.setItem(
      'departments',
      JSON.stringify(department.data || '[]'),
    );
  }
}
