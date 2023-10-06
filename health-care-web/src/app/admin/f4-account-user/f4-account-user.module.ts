import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F4AccountUserRoutingModule } from './f4-account-user-routing.module';
import { F4AccountUserListComponent } from './f4-account-user-list/f4-account-user-list.component';
import { F4AccountUserCreateComponent } from './f4-account-user-create/f4-account-user-create.component';
import { F4AccountUserEditComponent } from './f4-account-user-edit/f4-account-user-edit.component';
import { F4AccountUserDetailComponent } from './f4-account-user-detail/f4-account-user-detail.component';

@NgModule({
  declarations: [
    F4AccountUserListComponent,
    F4AccountUserCreateComponent,
    F4AccountUserEditComponent,
    F4AccountUserDetailComponent,
  ],
  imports: [CommonModule, F4AccountUserRoutingModule],
})
export class F4AccountUserModule {}
