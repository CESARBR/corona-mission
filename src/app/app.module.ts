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
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({
    backButtonText: 'Voltar'
  }), AppRoutingModule,
  IonicStorageModule.forRoot({
    name: '__db_corona_mission',
    driverOrder: ['localstorage']
  }),
  AngularFireModule.initializeApp(environment.firebase), AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirebaseDatabaseServices, AuthFirebaseService, FirebaseGoogleAuthService,
    CoronaToast, Camera, File, WebView
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
