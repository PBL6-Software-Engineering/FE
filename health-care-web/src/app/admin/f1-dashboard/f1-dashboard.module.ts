import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F1DashboardComponent } from './f1-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardAccountComponent } from './dashboard-account/dashboard-account.component';
import { F1DashboardRoutingModule } from './f1-dashboard-routing.nodule';
import { DashboardArticleComponent } from './dashboard-article/dashboard-article.component';

@NgModule({
  declarations: [F1DashboardComponent, DashboardAccountComponent, DashboardArticleComponent],
  imports: [CommonModule, NgChartsModule, F1DashboardRoutingModule],
})
export class F1DashboardModule {}
