import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F4ManageAdminComponent } from './f4-manage-admin.component';
const routes: Routes = [
  {
    path: '',
    component: F4ManageAdminComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F4ManageAdminRoutingModule {}
