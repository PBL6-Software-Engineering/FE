import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F12ChatComponent } from './f12-chat.component';

const routes: Routes = [
  {
    path: '',
    component: F12ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class F12ChatRoutingModule { }
