import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { environment } from 'src/environments/environment';

import * as firebase from 'firebase/app';
import { DatabaseServices } from './Firebase-Services/firebase.Database';
import { AuthFirebaseService } from './Firebase-Services/firebase.Auth';
firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  IonicStorageModule.forRoot({
    name: '__db_corona_mission',
    driverOrder: ['localstorage']
  })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatabaseServices, AuthFirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
