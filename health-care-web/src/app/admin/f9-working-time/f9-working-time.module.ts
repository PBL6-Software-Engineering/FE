import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F9WorkingTimeRoutingModule } from './f9-working-time-routing.module';
import { F9WorkingTimeComponent } from './f9-working-time.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    F9WorkingTimeComponent
  ],
  imports: [
    CommonModule,
    F9WorkingTimeRoutingModule,
    FormsModule,
    
  ]
})
export class F9WorkingTimeModule { }
