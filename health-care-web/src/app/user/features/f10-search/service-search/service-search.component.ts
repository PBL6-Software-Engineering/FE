import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-search',
  templateUrl: './service-search.component.html',
  styleUrls: ['./service-search.component.css'],
})
export class ServiceSearchComponent {
  @Input() hospital: any;
  constructor() {}
}
