import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowErrorComponent } from './components/show-error/show-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDirective } from './directives/form.directive';
import { FormControlPipe } from './pipes/form-control.pipe';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { ConvertToHourAndMinutePipe } from './pipes/convert-to-hour-and-minute.pipe';
import { CurrencyDirective } from './directives/currency.directive';

@NgModule({
  declarations: [
    ShowErrorComponent,
    FormDirective,
    FormControlPipe,
    ConvertToHourAndMinutePipe,
    CarouselComponent,
    PaginateComponent,
    CurrencyDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    ShowErrorComponent,
    FormDirective,
    FormControlPipe,
    ConvertToHourAndMinutePipe,
    CarouselComponent,
    PaginateComponent,
    CurrencyDirective,
  ],
})
export class CoreModule {}
