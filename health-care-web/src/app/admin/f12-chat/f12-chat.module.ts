import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F12ChatRoutingModule } from './f12-chat-routing.module';
import { F12ChatComponent } from './f12-chat.component';


@NgModule({
  declarations: [
    F12ChatComponent
  ],
  imports: [
    CommonModule,
    F12ChatRoutingModule
  ]
})
export class F12ChatModule { }
