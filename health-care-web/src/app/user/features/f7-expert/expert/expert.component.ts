import { Component, Input } from '@angular/core';
import { expertService } from '../../services/expert.service';
import { departmentService } from '../../services/department.service';
import { prefixApi } from 'src/app/core/constants/api.constant';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss'],
})
export class ExpertComponent {
  public doctors: any[];
  departments: any[];
  public total = 0;
  constructor(
    private expertService: expertService,
    private departmentService: departmentService,
    private el: ElementRef
  ) {}
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
        console.log(data);
        // this.doctors = data.data;
        this.total = data.total;
        data.data.forEach((doctor: any) => {
          if (doctor.avatar) {
            doctor.avatar = prefixApi + '/' + doctor.avatar;
          }
        });
        this.doctors = data.data;
      },
    });
  };
  ngOnInit(): void {
    this.expertService.getDoctor().subscribe({
      next: ({ data }) => {
        console.log(data);
        // this.doctors = data.data;
        this.total = data.total;
        data.data.forEach((doctor: any) => {
          if (doctor.avatar) {
            doctor.avatar = prefixApi + '/' + doctor.avatar;
          }
        });
        this.doctors = data.data;
      },
    });
    this.departmentService.getDepartment().subscribe({
      next: ({ data }) => {
        console.log(data);
        this.departments = data;
        console.log(this.departments);
      },
    });
  }
}
