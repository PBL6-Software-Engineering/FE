import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BehaviorService {
  private $category = new BehaviorSubject(null);
  category = this.$category.asObservable();

  private $searchText = new BehaviorSubject('');
  searchText = this.$searchText.asObservable();

  private $categoryName = new BehaviorSubject('');
  categoryName = this.$categoryName.asObservable();

  constructor() {}

  setCategory(category: any) {
    this.$category.next(category);
  }

  getCategory() {
    return this.category;
  }

  setSearchText(text: string) {
    this.$searchText.next(text);
  }

  getSearchText() {
    return this.searchText;
  }

  setCategoryName(name: string) {
    this.$categoryName.next(name);
  }

  getCategoryName() {
    return this.categoryName;
  }
}
