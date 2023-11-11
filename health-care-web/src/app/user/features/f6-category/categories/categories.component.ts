import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  textSearch: string = '';
  constructor() {}
  ngOnInit(): void {
    const categoriesStorage = localStorage.getItem('categories');
    if (categoriesStorage) {
      this.categories = JSON.parse(categoriesStorage);
    }
  }
}
