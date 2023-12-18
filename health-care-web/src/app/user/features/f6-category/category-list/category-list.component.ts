import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorService } from 'src/app/core/services/behavior.service';
import { toSlug } from 'src/app/core/libs/library.helper';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  textSearch: string = '';
  constructor(
    private router: Router,
    private behaviorService: BehaviorService,
  ) {}
  ngOnInit(): void {
    this.categories = JSON.parse(localStorage.getItem('categories') || '[]');
  }

  navigateCategoryDetail(category: any) {
    if (category && category.name) {
      this.behaviorService.setCategory(category);
      this.router.navigateByUrl(`/danh-muc/${toSlug(category.name)}`);
    }
  }
}
