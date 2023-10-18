import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyDyXcSL45y9ck5_wG1MTb2756cpUpyP2GE',
  authDomain: 'pbl6-8a7ac.firebaseapp.com',
  projectId: 'pbl6-8a7ac',
  storageBucket: 'pbl6-8a7ac.appspot.com',
  messagingSenderId: '40680894288',
  appId: '1:40680894288:web:8f452aa8c6387c288c8655',
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    NgSelectModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent],
})
export class AppModule {}
