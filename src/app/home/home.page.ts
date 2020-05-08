import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { DataService } from "../services/data.service";
import { LoadingController } from "@ionic/angular";
import { SafeUrl } from "@angular/platform-browser";
import { UtilService } from "../services/util.service";
import { ContactDatabaseService } from '../services/sqlite/contact-database.service';
import { Person, ContactChallenge } from '../models';
import { ContactChallengesDatabaseService } from '../services/sqlite/contact-challenges-database.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  private readonly STATUS_UNCHECK = "ellipse-outline";
  private readonly STATUS_CHECK = "checkmark-outline";
  private hasRegistered = true;

  private registeredUsers: Array<Person> = [];
  private loading: any;
  private imageSrc: SafeUrl;

  constructor(
    private navCtrl: NavController,
    private dataService: DataService,
    private contactDatabaseService: ContactDatabaseService,
    private contactChallengesDatabaseService: ContactChallengesDatabaseService,
    public loadingController: LoadingController,
    private utilService: UtilService
  ) {
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

      const contacts = await this.contactDatabaseService.getAll();

      this.hasRegistered = contacts.rows.length > 0;

      for (let i = 0; i < contacts.rows.length; i++) {
        const contact = contacts.rows.item(i);
        
        const iconFileName: string = "person_icon.png";
          let avatarName: string = contact.avatar;
          let imageSrc = !avatarName.endsWith(iconFileName)
            ? this.utilService.getCorrectImageUrl(avatarName)
            : avatarName;

          this.registeredUsers.push({
            imageSrc,
            ...contact,
          });
      }

      const resultChallenges = await this.contactChallengesDatabaseService.getAll();
      const challenges = [];

      for (let i =0; i < resultChallenges.rows.length; i++) {
        challenges.push(resultChallenges.rows.item(i)); 
      }

      this.registeredUsers.forEach(registeredUser => {

        registeredUser.challenges = challenges.filter(c => registeredUser.id === c.id_contact);
      });

      this.checkColorAndMessage();
      
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
      if (!challenge1.last_change) {
        return -1;
      } else {
        const chaDate1 = new Date(challenge1.last_change);
        const chaDate2 = new Date(challenge2.last_change);
        return chaDate1.getTime() - chaDate2.getTime();
      }
    })[challenges.length - 1];
    var daysInMiliseconds =
      new Date().getTime() - new Date(mostRecentChallenge.last_change).getTime();
    var days = Math.floor(daysInMiliseconds / (1000 * 3600 * 24));
    return days;
  }
  getMissionsToday(challenges) {
    const date = new Date();
    return challenges.filter(
      (challenge: ContactChallenge) =>
        challenge.last_change &&
        challenge.status === this.STATUS_CHECK &&
        new Date(challenge.last_change).getDate() === date.getDate() &&
        new Date(challenge.last_change).getMonth() === date.getMonth() &&
        new Date(challenge.last_change).getFullYear() === date.getFullYear()
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
