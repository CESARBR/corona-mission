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
import { FirebaseDatabaseServices } from './services/firebase/firebase-database.service';
import { AuthFirebaseService } from './services/firebase/firebase-auth.service';
import { FirebaseGoogleAuthService } from './services/firebase/firebase-google-auth.service';
import { CoronaToast } from './shared/corona-toast';

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
    FirebaseDatabaseServices, AuthFirebaseService, FirebaseGoogleAuthService,
    CoronaToast
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
