import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { DataService } from "../services/data.service";
import { AuthFirebaseService } from "../services/firebase/firebase-auth.service";
import { FirebaseDatabaseServices } from "../services/firebase/firebase-database.service";
import { LoadingController } from "@ionic/angular";
import { File } from "@ionic-native/file/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { UtilService } from "../services/util.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  private readonly STATUS_UNCHECK = "ellipse-outline";
  private readonly STATUS_CHECK = "checkmark-outline";
  items: any[] = [];
  hasRegistered = true;

  registeredUsers = [];
  loading: any;
  imageSrc: SafeUrl;

  constructor(
    private navCtrl: NavController,
    private dataService: DataService,
    private authFirebaseService: AuthFirebaseService,
    private databaseFirebaseService: FirebaseDatabaseServices,
    public loadingController: LoadingController,
    private utilService: UtilService
  ) {
    for (let i = 0; i < 1000; i++) {
      this.items.push({
        name: i,
        imgHeight: Math.floor(Math.random() * 50 + 150),
      });
    }
  }

  ionViewWillEnter() {
    this.registeredUsers = [];
    this.loadPersons();
  }

  ngOnInit() {}

  async loadPersons() {
    this.loading = await this.loadingController.create({
      message: "Aguarde...",
    });
    try {
      await this.loading.present();

      this.databaseFirebaseService
        .readItemByKey(
          "/users/" +
            (await this.authFirebaseService.getCurrentUserId()) +
            "/contacts",
          ""
        )
        .then((res) => {
          this.hasRegistered = Boolean(res && res.val());

          if (this.hasRegistered) {
            const responseVal = res.val();
            const iconFileName: string = "person_icon.png";
            Object.keys(responseVal).forEach((key) => {
              let avatarName: string = responseVal[key].avatar;
              let imageSrc = !avatarName.endsWith(iconFileName)
                ? this.utilService.getCorrectImageUrl(avatarName)
                : avatarName;

              this.registeredUsers.push({
                id: key,
                imageSrc,
                ...responseVal[key],
              });
            });
          }

          this.registeredUsers.sort(function (x, y) {
            let a = x.name.toUpperCase(),
              b = y.name.toUpperCase();
            return a == b ? 0 : a > b ? 1 : -1;
          });

          this.checkColorAndMessage();
        });
    } finally {
      this.loading.dismiss();
    }
  }

  checkColorAndMessage() {
    for (const contactValue of this.registeredUsers) {
      if (contactValue.challenges) {
        const missionsToday = this.getMissionsToday(contactValue.challenges);
        if (missionsToday === 0) {
          const daysAgoMissions =
            this.getLastUpdateChallenge(contactValue.challenges) || 0;
          if (daysAgoMissions < 3) {
            contactValue.mission = this.getTodayMissionsText(missionsToday);
            contactValue.mission_color = "dark";
            contactValue.color = "";
          } else {
            contactValue.mission =
              daysAgoMissions.toString() + " dia(s) sem missão.";
            contactValue.mission_color = "danger";
            contactValue.color = "#eb445a";
          }
        } else {
          contactValue.mission = this.getTodayMissionsText(missionsToday);
          contactValue.mission_color = "secondary";
          contactValue.color = "#3dc2ff";
        }
      } else {
        contactValue.mission = "Realize sua primeira missão";
        contactValue.mission_color = "dark";
        contactValue.color = "";
      }
    }
  }

  getTodayMissionsText(missionsToday: number) {
    const missionsPartialText = "miss" + (missionsToday > 1 ? "ões" : "ão");

    if (missionsToday > 0) {
      return `Você fez ${missionsToday} ${missionsPartialText} hoje.`;
    } else {
      return `Você não fez nenhuma missão hoje.`;
    }
  }

  getLastUpdateChallenge(challenges) {
    var mostRecentChallenge = challenges.sort((challenge1, challenge2) => {
      if (!challenge1.lastChange) {
        return -1;
      } else {
        const chaDate1 = new Date(challenge1.lastChange);
        const chaDate2 = new Date(challenge2.lastChange);
        return chaDate1.getTime() - chaDate2.getTime();
      }
    })[challenges.length - 1];
    var daysInMiliseconds =
      new Date().getTime() - new Date(mostRecentChallenge.lastChange).getTime();
    var days = Math.floor(daysInMiliseconds / (1000 * 3600 * 24));
    return days;
  }
  getMissionsToday(challenges) {
    const date = new Date();
    return challenges.filter(
      (challenge) =>
        challenge.lastChange &&
        challenge.status === this.STATUS_CHECK &&
        new Date(challenge.lastChange).getDate() === date.getDate() &&
        new Date(challenge.lastChange).getMonth() === date.getMonth() &&
        new Date(challenge.lastChange).getFullYear() === date.getFullYear()
    ).length;
  }

  openDetail(id) {
    this.dataService.setData(id, id);
    let str = "details/" + id;
    this.navCtrl.setDirection("forward");
    this.navCtrl.navigateForward(str);
  }

  addPerson() {
    this.navCtrl.setDirection("forward");
    this.navCtrl.navigateForward("/home/register");
  }
}
