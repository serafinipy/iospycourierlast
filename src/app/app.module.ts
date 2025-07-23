import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import {  AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {  AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
  
  ],
  providers: [
    HttpClient,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  //  { provide: LOCALE_ID, useValue: 'es' }

  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() /*
    private fcm: FCM,
    public platform: Platform,*/

  {
  //  this.initializeApp();
  }

}
