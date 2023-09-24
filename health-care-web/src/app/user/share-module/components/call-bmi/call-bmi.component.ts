import { Component } from '@angular/core';

@Component({
  selector: 'app-call-bmi',
  templateUrl: './call-bmi.component.html',
  styleUrls: ['./call-bmi.component.scss'],
})
export class CallBmiComponent {
  gender: number = 0;

  constructor() {}
}
