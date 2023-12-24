import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInAdminComponent } from './sign-in-admin/sign-in-admin.component';
import { SignInUserComponent } from './sign-in-user/sign-in-user.component';
import { SignInComponent } from './sign-in.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    SignInAdminComponent,
    SignInUserComponent,
    SignInComponent,
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
})
export class SignInModule {}
