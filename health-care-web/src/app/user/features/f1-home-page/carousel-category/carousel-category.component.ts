import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { toSlug } from 'src/app/core/libs/library.helper';
import { BehaviorService } from 'src/app/core/services/behavior.service';

@Component({
  selector: 'app-carousel-category',
  templateUrl: './carousel-category.component.html',
  styleUrls: ['./carousel-category.component.scss'],
})
export class CarouselCategoryComponent implements OnInit {
  categories: any[] = [];
  constructor(
    private router: Router,
    private behaviorService: BehaviorService,
  ) {}
  ngOnInit(): void {
    const categoriesStorage = localStorage.getItem('categories');
    if (categoriesStorage) {
      this.categories = JSON.parse(categoriesStorage);
    }
  }

  navigateCategoryDetail(category: any) {
    if (category && category.name) {
      this.behaviorService.setCategory(category);
      this.router.navigateByUrl(`/danh-muc/${toSlug(category.name)}`);
    }
  }
}
