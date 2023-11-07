import { Component, OnInit } from '@angular/core';
import { categoriesService } from '../../services/categories.service';
import { prefixApi } from 'src/app/core/constants/api.constant';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  constructor(
    private categoriesService: categoriesService,
    private el: ElementRef
  ) {}
  search = () => {
    var seachIput = this.el.nativeElement.querySelector('#searchInput');
    this.categoriesService.getCategories(seachIput.value).subscribe({
      next: ({ data }) => {
        data.data.forEach((element: any) => {
          if (element.thumbnail) {
            element.thumbnail = prefixApi + '/' + element.thumbnail;
          }
        });
        this.categories = data.data;
        console.log(this.categories);
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  };
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: ({ data }) => {
        data.data.forEach((element: any) => {
          if (element.thumbnail) {
            element.thumbnail = prefixApi + '/' + element.thumbnail;
          }
        });
        this.categories = data.data;
        console.log(this.categories);
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }
}
