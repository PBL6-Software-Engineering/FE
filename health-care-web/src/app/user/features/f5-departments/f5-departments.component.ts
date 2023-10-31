import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/admin/_services/department.service';
import { prefixApi } from 'src/app/core/constants/api.constant';

@Component({
  selector: 'app-f5-departments',
  templateUrl: './f5-departments.component.html',
  styleUrls: ['./f5-departments.component.scss'],
})
export class F5DepartmentsComponent implements OnInit {
  departments: any[] = [];
  constructor(private departmentService: DepartmentService) {}
  ngOnInit(): void {
    const departmentsStorage = localStorage.getItem('departments');
    if (departmentsStorage) {
      this.departments = JSON.parse(departmentsStorage);
    } else {
      this.departmentService.getAll().subscribe(({ data }) => {
        data.forEach((item: any) => {
          item.thumbnail = `${prefixApi}/${item.thumbnail}`;
        });
        this.departments = data;
        localStorage.setItem('departments', JSON.stringify(data));
      });
    }
  }
}
