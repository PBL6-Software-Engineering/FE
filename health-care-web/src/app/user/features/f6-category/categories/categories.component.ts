import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories: any = {
    id: 8,
    name: 'Ung thư - Ung bướu',
    thumbnail:
      'storage/image/thumbnail/categories/Cancer_category_1698507243.png',
    search_number: 0,
    created_at: '2023-10-28T08:10:52.000000Z',
    updated_at: '2023-10-28T15:34:04.000000Z',
  };
}
