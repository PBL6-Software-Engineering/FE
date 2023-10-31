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


export const firebaseConfig = {
  apiKey: 'AIzaSyDyXcSL45y9ck5_wG1MTb2756cpUpyP2GE',
  authDomain: 'pbl6-8a7ac.firebaseapp.com',
  projectId: 'pbl6-8a7ac',
  storageBucket: 'pbl6-8a7ac.appspot.com',
  messagingSenderId: '40680894288',
  appId: '1:40680894288:web:8f452aa8c6387c288c8655',
};

interface NgxSpinnerConfig {
  type?: string;
  color?: string;
}

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
  ],
  providers: [
    authInterceptorProviders,
    spinnerInterceptorProviders,
    AngularFireAuth,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
