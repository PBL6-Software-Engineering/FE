import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expert-card',
  templateUrl: './expert-card.component.html',
  styleUrls: ['./expert-card.component.scss'],
})
export class ExpertCardComponent {
  @Input() expert: any = {};
  constructor() {}
}
