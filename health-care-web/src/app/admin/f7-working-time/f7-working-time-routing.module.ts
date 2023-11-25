import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F7WorkingTimeComponent } from './f7-working-time.component';

const routes: Routes = [
  {
    path: '',
    component: F7WorkingTimeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F7WorkingTimeRoutingModule {}
