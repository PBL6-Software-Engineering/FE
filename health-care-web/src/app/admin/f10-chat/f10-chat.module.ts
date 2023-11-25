import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F10ChatRoutingModule } from './f10-chat-routing.module';
import { F10ChatComponent } from './f10-chat.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [F10ChatComponent],
  imports: [
    CommonModule,
    F10ChatRoutingModule,
    FormsModule,
    CoreModule,
    NgxSpinnerModule,
  ],
})
export class F10ChatModule {}
