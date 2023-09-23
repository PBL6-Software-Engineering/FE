import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowErrorComponent } from './components/show-error/show-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDirective } from './directives/form.directive';
import { FormControlPipe } from './pipes/form-control.pipe';



@NgModule({
  declarations: [
    ShowErrorComponent,
    FormDirective,
    FormControlPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ShowErrorComponent,
    FormDirective,
    FormControlPipe,
  ]
})
export class CoreModule { }
