import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  categories = [
    { id: 1, name: 'Sức khỏe răng miệng', link: 'https://cdn.hellobacsi.com/wp-content/uploads/2021/03/Oral-Health.png' },
    { id: 2, name: 'Dược liệu', link: 'https://cdn.hellobacsi.com/wp-content/uploads/2021/03/Herbals-_-Alternatives.png' },
    { id: 3, name: 'Tâm lý - Tâm thần', link: 'https://cdn.hellobacsi.com/wp-content/uploads/2021/02/Healthy-Mind.png' },
    { id: 4, name: 'Thể dục thể thao', link: 'https://cdn.hellobacsi.com/wp-content/uploads/2021/02/Healthy-Fitness.png' },
    { id: 5, name: 'Lão hóa lành mạnh', link: 'https://cdn.hellobacsi.com/wp-content/uploads/2021/02/Healthy-Aging.png' },
    { id: 6, name: 'Thói quen lành mạnh', link: 'https://cdn.hellobacsi.com/wp-content/uploads/2021/02/Healthy-Habits.png' },
  ];
  constructor() { }

  getCategories(): Observable<any[]> {
    return new Observable<any[]>(observer => {
      observer.next(this.categories);
    });
  }
}
