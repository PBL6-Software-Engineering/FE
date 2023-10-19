import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F4AccountUserListComponent } from './f4-account-user-list/f4-account-user-list.component';
import { F4AccountUserCreateComponent } from './f4-account-user-create/f4-account-user-create.component';
import { F4AccountUserEditComponent } from './f4-account-user-edit/f4-account-user-edit.component';
import { F4AccountUserDetailComponent } from './f4-account-user-detail/f4-account-user-detail.component';

const routes: Routes = [
  {
    path: '',
    component: F4AccountUserListComponent,
  },
  {
    path: 'create',
    component: F4AccountUserCreateComponent,
  },
  {
    path: 'edit/:id',
    component: F4AccountUserEditComponent,
  },
  {
    path: 'detail/:id',
    component: F4AccountUserDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F4AccountUserRoutingModule {}
