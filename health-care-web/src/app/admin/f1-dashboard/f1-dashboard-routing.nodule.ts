import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F1DashboardComponent } from './f1-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: F1DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F1DashboardRoutingModule {}
