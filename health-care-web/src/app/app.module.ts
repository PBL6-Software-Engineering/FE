import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptorProviders } from './core/helpers/auth.interceptor';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { QuillModule } from 'ngx-quill';
import { spinnerInterceptorProviders } from './core/helpers/http.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { preprocessResponseProviders } from './core/helpers/preprocess_response.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import * as moment from 'moment';

import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

export const firebaseConfig = {
  apiKey: 'AIzaSyDyXcSL45y9ck5_wG1MTb2756cpUpyP2GE',
  authDomain: 'pbl6-8a7ac.firebaseapp.com',
  projectId: 'pbl6-8a7ac',
  storageBucket: 'pbl6-8a7ac.appspot.com',
  messagingSenderId: '40680894288',
  appId: '1:40680894288:web:8f452aa8c6387c288c8655',
};

const config: SocketIoConfig = {
  url: 'https://backend-chat-socket-production.up.railway.app/',
  options: {},
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
    HttpClientModule,
    CoreModule,
    FormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    QuillModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-pulse-sync' }),
    NgxSkeletonLoaderModule.forRoot(),
    NgProgressModule.withConfig({
      color: '#11B3CF',
    }),
    NgProgressHttpModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    authInterceptorProviders,
    spinnerInterceptorProviders,
    preprocessResponseProviders,
    AngularFireAuth,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1058739175311564'),
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '255808396138-caffgiei9rvo2nve4l2206db309bvjbb.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    { provide: 'moment', useValue: moment },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
