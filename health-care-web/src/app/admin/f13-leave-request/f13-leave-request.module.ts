import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F13LeaveRequestRoutingModule } from './f13-leave-request-routing.module';
import { F13LeaveRequestListComponent } from './f13-leave-request-list/f13-leave-request-list.component';
import { F13LeaveRequestCreateComponent } from './f13-leave-request-create/f13-leave-request-create.component';
import { F13LeaveRequestEditComponent } from './f13-leave-request-edit/f13-leave-request-edit.component';
import { F13LeaveRequestDetailComponent } from './f13-leave-request-detail/f13-leave-request-detail.component';


@NgModule({
  declarations: [
    F13LeaveRequestListComponent,
    F13LeaveRequestCreateComponent,
    F13LeaveRequestEditComponent,
    F13LeaveRequestDetailComponent
  ],
  imports: [
    CommonModule,
    F13LeaveRequestRoutingModule
  ]
})
export class F13LeaveRequestModule { }
