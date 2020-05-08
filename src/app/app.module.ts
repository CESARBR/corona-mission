import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { IonicStorageModule } from "@ionic/storage";
import { environment } from "src/environments/environment";

import { CoronaToast } from "./shared/corona-toast";
import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { UtilService } from "./services/util.service";
import { DatabaseProvider } from './services/sqlite/database.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { ContactDatabaseService } from './services/sqlite/contact-database.service';
import { ChallengeDatabaseService } from './services/sqlite/challenge-database.service';
import { ContactChallengesDatabaseService } from './services/sqlite/contact-challenges-database.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      backButtonText: "Voltar",
    }),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: "__db_corona_mission",
      driverOrder: ["localstorage"],
    }),
  ],
  providers: [
    SQLite,
    DatabaseProvider,
    ContactDatabaseService,
    ChallengeDatabaseService,
    ContactChallengesDatabaseService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CoronaToast,
    Camera,
    File,
    WebView,
    UtilService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
