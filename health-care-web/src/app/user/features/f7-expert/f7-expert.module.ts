import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F7ExpertRoutingModule } from './f7-expert-routing.module';
import { ExpertComponent } from './expert/expert.component';
import { ExpertDetailComponent } from './expert-detail/expert-detail.component';
import { ExpertCardComponent } from './expert-card/expert-card.component';
import { ShareModuleModule } from '../../share-module/share-module.module';

@NgModule({
  declarations: [ExpertComponent, ExpertDetailComponent, ExpertCardComponent],
  imports: [CommonModule, F7ExpertRoutingModule, ShareModuleModule],
})
export class F7ExpertModule{
  
}
