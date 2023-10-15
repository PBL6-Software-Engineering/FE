import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowErrorComponent } from './components/show-error/show-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDirective } from './directives/form.directive';
import { FormControlPipe } from './pipes/form-control.pipe';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PaginateComponent } from './components/paginate/paginate.component';

@NgModule({
  declarations: [
    ShowErrorComponent,
    FormDirective,
    FormControlPipe,
    CarouselComponent,
    PaginateComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    ShowErrorComponent,
    FormDirective,
    FormControlPipe,
    CarouselComponent,
    PaginateComponent,
  ],
})
export class CoreModule {}
