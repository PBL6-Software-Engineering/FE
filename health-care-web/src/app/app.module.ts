import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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

import { QuillModule } from 'ngx-quill';
import { spinnerInterceptorProviders } from './core/helpers/http.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { preprocessResponseProviders } from './core/helpers/preprocess_response.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { linkSocket, GOOGLE_ID } from './core/constants/api.constant';

import {
  GoogleLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleSigninButtonModule,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';

const config: SocketIoConfig = {
  url: linkSocket,
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
    QuillModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-pulse-sync' }),
    NgxSkeletonLoaderModule.forRoot(),
    NgProgressModule.withConfig({
      color: '#2095c4',
    }),
    NgProgressHttpModule,
    SocketIoModule.forRoot(config),
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  providers: [
    authInterceptorProviders,
    spinnerInterceptorProviders,
    preprocessResponseProviders,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1058739175311564', {
              oneTapEnabled: false, // <===== default is true
            }),
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(GOOGLE_ID, {
              oneTapEnabled: false, // <===== default is true
            }),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
