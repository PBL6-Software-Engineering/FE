import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F12ChatRoutingModule } from './f12-chat-routing.module';
import { F12ChatComponent } from './f12-chat.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    F12ChatComponent
  ],
  imports: [
    CommonModule,
    F12ChatRoutingModule,
    FormsModule,
    CoreModule,
    NgxSpinnerModule
  ]
})
export class F12ChatModule { }
