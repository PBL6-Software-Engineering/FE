import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { F1HomePageModule } from './features/f1-home-page/f1-home-page.module';
import { SubHeaderComponent } from './layout/components/sub-header/sub-header.component';
import { HeaderInfoUserComponent } from './layout/components/header-info-user/header-info-user.component';
import { SubHeaderMobileComponent } from './layout/components/sub-header-mobile/sub-header-mobile.component';
import { F2UserModule } from './features/f2-user/f2-user.module';
import { CoreModule } from '../core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { F8ConversationsComponent } from './features/f8-conversations/f8-conversations.component';
import { F9ChatComponent } from './features/f9-chat/f9-chat.component';
import { ShareModuleModule } from './share-module/share-module.module';
import { F10ChatGptComponent } from './features/f10-chat-gpt/f10-chat-gpt.component';

@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    FooterComponent,
    SubHeaderComponent,
    HeaderInfoUserComponent,
    SubHeaderMobileComponent,
    F8ConversationsComponent,
    F9ChatComponent,
    F10ChatGptComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    F1HomePageModule,
    F2UserModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ShareModuleModule,
  ],
})
export class UserModule {}
