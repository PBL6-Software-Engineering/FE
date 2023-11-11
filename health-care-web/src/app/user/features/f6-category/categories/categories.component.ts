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
    this.categories = JSON.parse(localStorage.getItem('categories') || '[]');
  }
}
