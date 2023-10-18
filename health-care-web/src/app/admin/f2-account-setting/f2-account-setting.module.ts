import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F2AccountSettingRoutingModule } from './f2-account-setting-routing.module';
import { F2AccountSettingComponent } from './f2-account-setting.component';

@NgModule({
  declarations: [F2AccountSettingComponent],
  imports: [CommonModule, F2AccountSettingRoutingModule],
})
export class F2AccountSettingModule {}
