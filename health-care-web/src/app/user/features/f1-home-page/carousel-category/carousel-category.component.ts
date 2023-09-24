import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-carousel-category',
  templateUrl: './carousel-category.component.html',
  styleUrls: ['./carousel-category.component.scss'],
})
export class CarouselCategoryComponent implements OnInit {
  categories: any[] = [];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.userService.getCategoris().subscribe((res) => {
      this.categories = res;
    });
  }
}
