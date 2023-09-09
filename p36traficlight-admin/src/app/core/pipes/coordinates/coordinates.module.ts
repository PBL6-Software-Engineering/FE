import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoordinatesPipe } from './coordinates.pipe';

@NgModule({
  declarations: [CoordinatesPipe],
  imports: [CommonModule],
  exports: [CoordinatesPipe],
})
export class CoordinatesModule {}
