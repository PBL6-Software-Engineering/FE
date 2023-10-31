import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/admin/_services/category.service';
import { prefixApi } from 'src/app/core/constants/api.constant';
@Component({
  selector: 'app-f4-categories',
  templateUrl: './f4-categories.component.html',
  styleUrls: ['./f4-categories.component.scss'],
})
export class F4CategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(
  ) {}

  ngOnInit(): void {
    const categoriesStorage = localStorage.getItem('categories');
    if (categoriesStorage) {
      this.categories = JSON.parse(categoriesStorage);
    }
  }
}
