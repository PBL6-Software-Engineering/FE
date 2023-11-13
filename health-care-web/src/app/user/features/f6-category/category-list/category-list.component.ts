import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  textSearch: string = '';
  constructor() {}
  ngOnInit(): void {
    this.categories = JSON.parse(localStorage.getItem('categories') || '[]');
  }
}
