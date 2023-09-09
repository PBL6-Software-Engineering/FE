import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { F9AccountsComponent } from './f9-accounts.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { F9AccountsAddComponent } from './f9-accounts-add/f9-accounts-add.component';
import { F9AccountsUpdateComponent } from './f9-accounts-update/f9-accounts-update.component';
import { F9AccountsSearchComponent } from './f9-accounts-search/f9-accounts-search.component';
import { DropdownMenusModule } from 'src/app/template/partials';
import { F9AccountsFilterComponent } from './f9-accounts-filter/f9-accounts-filter.component';

@NgModule({
  declarations: [
    F9AccountsComponent,
    F9AccountsAddComponent,
    F9AccountsUpdateComponent,
    F9AccountsSearchComponent,
    F9AccountsFilterComponent,
  ],

  imports: [
    // TransferHttpCacheModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: F9AccountsComponent,
        children: [],
      },
      {
        path: 'add',
        component: F9AccountsAddComponent,
      },
      {
        path: 'update/:id',
        component: F9AccountsUpdateComponent,
      }
    ]),
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),

    InlineSVGModule,
    DropdownMenusModule,
  ],
  entryComponents: [],
})
export class F9AccountsModule { }
