import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F13LeaveRequestListComponent } from './f13-leave-request-list/f13-leave-request-list.component';
import { F13LeaveRequestDetailComponent } from './f13-leave-request-detail/f13-leave-request-detail.component';
import { F13LeaveRequestCreateComponent } from './f13-leave-request-create/f13-leave-request-create.component';
import { F13LeaveRequestEditComponent } from './f13-leave-request-edit/f13-leave-request-edit.component';

const routes: Routes = [
  {
    path: '',
    component: F13LeaveRequestListComponent,
  },
  {
    path: 'create',
    component: F13LeaveRequestCreateComponent,
  },
  {
    path: 'edit/:id',
    component: F13LeaveRequestEditComponent,
  },
  {
    path: 'detail/:id',
    component: F13LeaveRequestDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F13LeaveRequestRoutingModule {}
