import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowErrorComponent } from './components/show-error/show-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDirective } from './directives/form.directive';
import { FormControlPipe } from './pipes/form-control.pipe';
import { PaginateComponent } from './components/paginate/paginate.component';
import { ConvertToHourAndMinutePipe } from './pipes/convert-to-hour-and-minute.pipe';
import { CurrencyDirective } from './directives/currency.directive';
import { AgePipe } from './pipes/age.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from './directives/click_outside.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { GenderPipe } from './pipes/gender.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [
    ShowErrorComponent,
    FormDirective,
    FormControlPipe,
    ConvertToHourAndMinutePipe,
    PaginateComponent,
    CurrencyDirective,
    AgePipe,
    SpinnerComponent,
    ClickOutsideDirective,
    FilterPipe,
    GenderPipe,
    TimeAgoPipe,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    ShowErrorComponent,
    FormDirective,
    FormControlPipe,
    ConvertToHourAndMinutePipe,
    PaginateComponent,
    CurrencyDirective,
    AgePipe,
    SpinnerComponent,
    ClickOutsideDirective,
    FilterPipe,
    GenderPipe,
    TimeAgoPipe,
  ],
})
export class CoreModule {}
