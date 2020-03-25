import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { CallNumber } from '@ionic-native/call-number/ngx';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';
import { StorageService } from '../../services/storage.service';
import { DatabaseServices } from '../../Firebase-Services/firebase.Database';
import { AuthFirebaseService } from '../../Firebase-Services/firebase.Auth';

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

  constructor(private route: ActivatedRoute, private storage: StorageService, private navCtrl: NavController, private database: DatabaseServices, private auth: AuthFirebaseService) {
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

  ngOnInit() {}

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
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  moreChallenges() {
    let count = 3
    let j = 0;
    while (j < count) {
      let newChallenge = this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)];
      let notFound = true;
      for (let i = 0; i < this.person.challenges.length; i++) {
        if (this.person.challenges[i].id == newChallenge.id) {
          notFound = false;
        }
      }
      if (notFound) {
        this.person.challenges.push(newChallenge);
        j++;
      }
      if (this.person.challenges.length === this.SampleJson.length) {
        break;
      }
    }
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

  editPerson(id) {
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward('details/'+ id +'/edit')
  }

  changeStatus(challenge) {
    
    for (let i = 0; i < this.person.challenges.length; i++) {
      if (this.person.challenges[i].id === challenge.id) {
        if (challenge.status == this.STATUS_CHECK) {
          this.person.challenges[i].status = this.STATUS_UNCHECK;

        } else {
          this.person.challenges[i].status = this.STATUS_CHECK;
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
