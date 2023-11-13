import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F5DepartmentListComponent } from './f5-department-list/f5-department-list.component';
import { F5DepartmentRoutingModule } from './f5-department.module.routing';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [F5DepartmentListComponent],
  imports: [CommonModule, F5DepartmentRoutingModule, CoreModule, FormsModule],
})
export class F5DepartmentModule {}
