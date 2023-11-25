import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F9WorkingTimeComponent } from './f9-working-time.component';

const routes: Routes = [
  {
    path: '',
    component: F9WorkingTimeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class F9WorkingTimeRoutingModule { }
