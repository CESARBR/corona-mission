import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController, PopoverController } from "@ionic/angular";
import { DataService } from "src/app/services/data.service";
import { CallComponent } from "src/app/components/call/call.component";
import { LoadingController } from "@ionic/angular";
import { SafeUrl } from "@angular/platform-browser";
import { UtilService } from "../../services/util.service";
import { ContactDatabaseService } from 'src/app/services/sqlite/contact-database.service';
import { ContactChallengesDatabaseService } from 'src/app/services/sqlite/contact-challenges-database.service';
import { ContactChallenge } from 'src/app/models';

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"],
})
export class DetailsPage implements OnInit {
  private readonly STATUS_UNCHECK = "ellipse-outline";
  private readonly STATUS_CHECK = "checkmark-outline";

  private idContact: number;
  person: any;
  persons: any;
  loading: any;
  imageSrc: SafeUrl;

  countMissions: number;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private navCtrl: NavController,
    private contactDatabaseService: ContactDatabaseService,
    private contactChallengesDatabaseService: ContactChallengesDatabaseService,
    private popoverController: PopoverController,
    public loadingController: LoadingController,
    private utilService: UtilService
  ) {
    
  }

  async ionViewWillEnter() {
    this.loading = await this.loadingController.create({
      message: "Aguarde...",
    });

    try {
      await this.loading.present();

      this.idContact = this.route.snapshot.data["idContact"];
      const contact = await this.contactDatabaseService.getById(this.idContact);
      this.person = contact.rows.item(0);
      this.person.challenges = [];

      const iconFileName: string = "person_icon.png";
      let avatarName: string = this.person.avatar;

      this.imageSrc = !avatarName.endsWith(iconFileName)
        ? this.utilService.getCorrectImageUrl(this.person.avatar)
        : this.person.avatar;

      const resultChallenges = await this.contactChallengesDatabaseService.getAllByContact(this.idContact);

      for (let i =0; i < resultChallenges.rows.length; i++) {
        this.person.challenges.push(resultChallenges.rows.item(i)); 
      }
 
      this.updateCountMissions();
    } finally {
      this.loading.dismiss();
    }
  }

  ngOnInit() {}

  shuffle(array) {
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    for (let i = 0; i < 3; i++) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * (array.length - 4)) + 3;

      // And swap it with the current element.
      temporaryValue = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  moreChallenges() {
    this.person.challenges = this.shuffle(this.person.challenges);
  }

  async call(ev: any) {
    const popover = await this.popoverController.create({
      component: CallComponent,
      componentProps: {
        phoneNumber: this.person.phone.replace(/[^\d]/g, ""),
      },
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }

  async removePerson() {
    this.loading = await this.loadingController.create({
      message: "Aguarde...",
    });
    await this.loading.present();
    await this.contactChallengesDatabaseService.deleteByContact(this.idContact);
    await this.contactDatabaseService.deleteById(this.idContact);
    this.loading.dismiss();
    this.navCtrl.navigateBack("home");
  }

  editPerson() {
    this.dataService.setData(this.idContact, this.idContact);
    this.navCtrl.setDirection("forward");
    this.navCtrl.navigateForward("details/" + this.idContact + "/edit");
  }

  async changeStatus(challenge) {
    const updatedChallenge = challenge;

    for (let i = 0; i < this.person.challenges.length; i++) {
      if (this.person.challenges[i].id === challenge.id) {

        updatedChallenge.status = updatedChallenge.status == this.STATUS_CHECK ? this.STATUS_UNCHECK : this.STATUS_CHECK;
        this.person.challenges[i].status = updatedChallenge.status;
        break;
      }
    }

    await this.contactChallengesDatabaseService.updateStatus(this.idContact, updatedChallenge.id, updatedChallenge.status);

    this.updateCountMissions();
  }

  private updateCountMissions() {
    this.countMissions = this.person.challenges.filter(
      (c: ContactChallenge) => c.status === this.STATUS_CHECK
    ).length;
  }
}
