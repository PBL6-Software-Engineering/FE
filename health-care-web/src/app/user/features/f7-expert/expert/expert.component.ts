import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ExpertService } from '../../../services/expert.service';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss'],
})
export class ExpertComponent {
  public doctors: any[];
  departments: any[];
  public total = 0;

  constructor(private expertService: ExpertService, private el: ElementRef) {}

  selectDepartment = (event: Event) => {
    const clickedElement = event.target as HTMLElement;
    this.el.nativeElement.querySelector('#departmentInput').value =
      clickedElement.innerText;
  };

  selectDoctor = (event: Event) => {
    const clickedElement = event.target as HTMLElement;
    this.el.nativeElement.querySelector('#doctorInput').value =
      clickedElement.innerText;
  };

  searchDoctor = () => {
    var doctorName = this.el.nativeElement.querySelector('#doctorInput').value;
    var departmentName =
      this.el.nativeElement.querySelector('#departmentInput').value;
    this.expertService.getDoctor(doctorName, departmentName).subscribe({
      next: ({ data }) => {
        this.total = data.total;
        this.doctors = data.data;
      },
    });
  };

  ngOnInit(): void {
    this.expertService.getDoctor().subscribe({
      next: ({ data }) => {
        this.total = data.total;
        this.doctors = data.data;
      },
    });
    this.departments = JSON.parse(localStorage.getItem('departments') || '[]');
  }
}
