import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() items: any[] = [];
  @Input() numberItemShow = 6;
  index = 0;
  constructor() {}

  getArrayStep() {
    const numberStep = Math.ceil(
      (this.items.length - this.numberItemShow) / this.numberItemShow
    );
    return new Array(numberStep + 1);
  }

  changeSlide(i: number) {
    this.index = i * this.numberItemShow;
  }
}
