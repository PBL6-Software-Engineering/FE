import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { F1HomePageModule } from './features/f1-home-page/f1-home-page.module';
import { F2TestModule } from './features/f2-test/f2-test.module';


@NgModule({
  declarations: [
  
    UserComponent,
       HeaderComponent,
       FooterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    F1HomePageModule,
    F2TestModule
  ]
})
export class UserModule { }
