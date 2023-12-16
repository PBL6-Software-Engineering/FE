import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F10SearchComponent } from './f10-search.component';

const routes: Routes = [
  {
    path: '',
    component: F10SearchComponent,
  },
  {
    path: ':textSearch',
    component: F10SearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F10SearchRoutingModule {}
