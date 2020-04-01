import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { CallNumber } from '@ionic-native/call-number/ngx';
import { NavController } from '@ionic/angular';
import { FirebaseDatabaseServices } from '../../services/firebase/firebase-database.service';
import { AuthFirebaseService } from '../../services/firebase/firebase-auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private readonly STATUS_UNCHECK = "ellipse-outline";
  private readonly STATUS_CHECK = "checkmark-outline";

  idContact: string;
  person: any;
  challenges: any;
  SampleJson: any;
  persons: any;

  countMissions: number;
  private contactsPath: string;

  constructor(private route: ActivatedRoute, private dataService: DataService, private navCtrl: NavController, private database: FirebaseDatabaseServices, private auth: AuthFirebaseService) {
    this.contactsPath = '/users/' + this.auth.getCurrentUserId() + '/contacts';
  }

  async ionViewWillEnter() {
    this.idContact = this.route.snapshot.data['idContact'];
    const contact = await this.database.readItemByKey(`${this.contactsPath}/${this.idContact}`);
    this.person = contact.val();

    const challengersDatabase = await this.database.readItemByKey('/challenges');
    this.challenges = challengersDatabase.val();

    if (!this.person.challenges) {
      this.person.challenges = this.challenges;
      this.updateChallenges();
    }
    //TODO implement update new/older challengers

    this.updateCountMissions();
  }

  ngOnInit() { }

  updateChallenges() {
    if (this.idContact) {
      this.database.bruteUpdateItem(this.contactsPath + '/' + this.idContact + '/challenges', this.person.challenges ? this.person.challenges : []);
    }
  }

  getThreeChallenges() {
    return [this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)],
    this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)],
    this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)]];
  }

  shuffle(array) {
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    for (var i = 0; i < 3; i++) {
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
    this.updateChallenges();
  }




  call() {
    console.log("TODO");
    // this.callNumber.callNumber(this.person.phone, true)
    // .then(res => console.log('Launched dialer!', res))
    // .catch(err => console.log('Error launching dialer', err));
  }

  async removePerson() {
    await this.database.bruteUpdateItem(`${this.contactsPath}/${this.idContact}`, null);

    this.navCtrl.navigateBack('home');
  }

  editPerson() {
    this.dataService.setData(this.idContact, this.idContact);
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward('details/' + this.idContact + '/edit');
  }

  changeStatus(challenge) {

    for (let i = 0; i < this.person.challenges.length; i++) {
      if (this.person.challenges[i].id === challenge.id) {
        if (challenge.status == this.STATUS_CHECK) {
          this.person.challenges[i].status = this.STATUS_UNCHECK;
          this.person.challenges[i].lastChange = new Date((new Date().getTime() - (3 * 3600 * 1000))).toISOString();
        } else {
          this.person.challenges[i].status = this.STATUS_CHECK;
          this.person.challenges[i].lastChange = new Date((new Date().getTime() - (3 * 3600 * 1000))).toISOString();
        }
        break;
      }
    }

    this.updateCountMissions();

    this.updateChallenges();
  }

  private updateCountMissions() {
    this.countMissions = this.person.challenges.filter(c => c.status === this.STATUS_CHECK).length;
  }
}
