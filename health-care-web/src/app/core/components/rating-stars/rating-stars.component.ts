import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css'],
})
export class RatingStarsComponent implements OnInit {
  @Input() rating: number = 0;
  @Input() readOnly: boolean = false;
  @Input() fontSize: any = '20';
  @Output() ratingChange = new EventEmitter<number>();

  descriptionsRating = ['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

  constructor() {}

  ngOnInit(): void {}

  onClickStar(value: any): void {
    if (!this.readOnly) {
      this.rating = value;
      console.log('rating', this.rating);
      this.ratingChange.emit(this.rating);
    }
  }

  getArrayStarCheck() {
    const array = [];
    for (let i = 1; i <= this.rating; i++) {
      array.push(i);
    }
    return array;
  }

  getArrayStarUncheck() {
    const array = [];
    for (let i = this.rating + 1; i <= 5; i++) {
      array.push(i);
    }
    return array;
  }

  colors = [
    '#ff4545',
    'rgb(223 101 21)',
    'rgb(236 145 19)',
    'rgb(25 196 22)',
    'rgb(35 127 7)',
  ];
  getColorDescRating() {
    return this.colors[this.rating - 1];
  }
}
