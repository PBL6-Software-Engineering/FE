import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-department-card',
  templateUrl: './department-card.component.html',
  styleUrls: ['./department-card.component.css'],
})
export class DepartmentCardComponent {
  @Input() department: any = {};
}
