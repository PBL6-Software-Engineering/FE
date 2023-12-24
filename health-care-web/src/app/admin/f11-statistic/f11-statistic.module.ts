import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F11StatisticRoutingModule } from './f11-statistic-routing.module';
import { StatisticCategoryComponent } from './statistic-category/statistic-category.component';
import { StatisticDepartmentComponent } from './statistic-department/statistic-department.component';
import { StatisticArticleComponent } from './statistic-article/statistic-article.component';
import { StatisticHospitalComponent } from './statistic-hospital/statistic-hospital.component';
import { StatisticDoctorComponent } from './statistic-doctor/statistic-doctor.component';
import { StatisticAppointmentComponent } from './statistic-appointment/statistic-appointment.component';

@NgModule({
  declarations: [
    StatisticCategoryComponent,
    StatisticDepartmentComponent,
    StatisticArticleComponent,
    StatisticHospitalComponent,
    StatisticDoctorComponent,
    StatisticAppointmentComponent
  ],
  imports: [CommonModule, F11StatisticRoutingModule],
})
export class F11StatisticModule {}
