import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F10ChatComponent } from './f10-chat.component';

const routes: Routes = [
  {
    path: '',
    component: F10ChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F10ChatRoutingModule {}
