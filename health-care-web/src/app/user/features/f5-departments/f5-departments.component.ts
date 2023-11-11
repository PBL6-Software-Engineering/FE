import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/admin/_services/department.service';

@Component({
  selector: 'app-f5-departments',
  templateUrl: './f5-departments.component.html',
  styleUrls: ['./f5-departments.component.scss'],
})
export class F5DepartmentsComponent implements OnInit {
  departments: any[] = [];
  textSearch: string = ''
  constructor(private departmentService: DepartmentService) {}
  ngOnInit(): void {
    const departmentsStorage = localStorage.getItem('departments');
    if (departmentsStorage) {
      this.departments = JSON.parse(departmentsStorage);
    } else {
      this.departmentService.getAll().subscribe(({ data }) => {
        this.departments = data;
        localStorage.setItem('departments', JSON.stringify(data));
      });
    }
  }
}
