import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-f5-department-list',
  templateUrl: './f5-department-list.component.html',
  styleUrls: ['./f5-department-list.component.scss'],
})
export class F5DepartmentListComponent implements OnInit {
  departments: any[] = [];
  textSearch: string = '';
  constructor(private commonService: CommonService) {}
  ngOnInit(): void {
    const departmentsStorage = localStorage.getItem('departments');
    if (departmentsStorage) {
      this.departments = JSON.parse(departmentsStorage);
    } else {
      this.commonService.getDepartments().subscribe(({ data }) => {
        this.departments = data;
        localStorage.setItem('departments', JSON.stringify(data));
      });
    }
  }
}
