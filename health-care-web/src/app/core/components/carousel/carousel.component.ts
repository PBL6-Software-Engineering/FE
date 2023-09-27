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
    return new Array(this.items.length - this.numberItemShow + 1);
  }

  changeSlide(i: number) {
    console.log(i);
    this.index = i;
  }
}