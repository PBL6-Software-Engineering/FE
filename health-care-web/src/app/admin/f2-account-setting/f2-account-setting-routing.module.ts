import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F2AccountSettingComponent } from './f2-account-setting.component';

const routes: Routes = [
  {
    path: '',
    component: F2AccountSettingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F2AccountSettingRoutingModule {}
