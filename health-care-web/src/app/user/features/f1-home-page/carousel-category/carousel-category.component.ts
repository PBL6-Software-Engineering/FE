import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-carousel-category',
  templateUrl: './carousel-category.component.html',
  styleUrls: ['./carousel-category.component.scss'],
})
export class CarouselCategoryComponent implements OnInit {
  categories: any[] = [];
  constructor() {}
  ngOnInit(): void {
    const categoriesStorage = localStorage.getItem('categories');
    if (categoriesStorage) {
      this.categories = JSON.parse(categoriesStorage);
    }
  }
}
