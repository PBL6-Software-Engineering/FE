import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpertComponent } from './expert/expert.component';
import { ExpertDetailComponent } from './expert-detail/expert-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ExpertComponent,
  },
  {
    path: ':id',
    component: ExpertDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F7ExpertRoutingModule {}
