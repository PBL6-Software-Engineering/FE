import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F4ManageAdminComponent } from './f4-manage-admin.component';
import { F4ManageAdminRoutingModule } from './f4-manage-admin-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { F4CreateAdminComponent } from './f4-create-admin/f4-create-admin.component';
import { F4EditAdminComponent } from './f4-edit-admin/f4-edit-admin.component';

@NgModule({
  declarations: [
    F4ManageAdminComponent,
    F4CreateAdminComponent,
    F4EditAdminComponent,
  ],
  imports: [
    CommonModule,
    F4ManageAdminRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
  ],
})
export class F4ManageAdminModule {}
