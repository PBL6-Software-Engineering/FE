import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F7WorkingTimeRoutingModule } from './f7-working-time-routing.module';
import { F7WorkingTimeComponent } from './f7-working-time.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [F7WorkingTimeComponent],
  imports: [CommonModule, F7WorkingTimeRoutingModule, FormsModule],
})
export class F7WorkingTimeModule {}
