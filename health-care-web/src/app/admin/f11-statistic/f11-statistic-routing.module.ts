import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticCategoryComponent } from './statistic-category/statistic-category.component';
import { StatisticDepartmentComponent } from './statistic-department/statistic-department.component';
import { StatisticArticleComponent } from './statistic-article/statistic-article.component';
import { StatisticAppointmentComponent } from './statistic-appointment/statistic-appointment.component';
import { StatisticDoctorComponent } from './statistic-doctor/statistic-doctor.component';
import { StatisticHospitalComponent } from './statistic-hospital/statistic-hospital.component';

const routes: Routes = [
  {
    path: 'category',
    component: StatisticCategoryComponent,
  },
  {
    path: 'department',
    component: StatisticDepartmentComponent,
  },
  {
    path: 'article',
    component: StatisticArticleComponent,
  },
  {
    path: 'hospital',
    component: StatisticHospitalComponent,
  },
  {
    path: 'doctor',
    component: StatisticDoctorComponent,
  },
  {
    path: 'appointment',
    component: StatisticAppointmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F11StatisticRoutingModule {}
