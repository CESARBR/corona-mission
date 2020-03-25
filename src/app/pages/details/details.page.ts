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

  data: any;
  person: any;
  challenges: any;
  SampleJson: any;
  persons: any;

  countMissions: number;
  private contactsPath: string;

  constructor(private route: ActivatedRoute, private storage: StorageService, private navCtrl: NavController, private database: DatabaseServices, private auth: AuthFirebaseService) {
    this.contactsPath = '/users/' + this.auth.getCurrentUserId() + '/contacts';
  }

  ngOnInit() {
    this.SampleJson = this.database.readItemByKey('/challenges').then(res => {
      return res.val();
    });
    this.person = null;
    if (this.route.snapshot.data['idContact']) {
      this.data = this.route.snapshot.data['idContact'];

      this.person = this.database.readItemByKey(this.contactsPath, this.data).then(res => {
        return res.val()
      });

      if (this.person) {
        if (!this.person.challenges) {
          this.challenges = [this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)],
          this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)],
          this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)]];
          this.person.challenges = this.challenges;
          this.updateChallenges();
        }
      }
      this.updateCountMissions();

    }
  }

  updateChallenges() {
    if (this.data) {
      this.database.bruteUpdateItem(this.contactsPath + '/' + this.data + '/challenges', this.person.challenges ? this.person.challenges : []);
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

  updatePerson(id) {
    this.database.bruteUpdateItem(this.contactsPath + id, null);

    this.navCtrl.setDirection("back");
    this.navCtrl.navigateForward('home');
  }

  changeStatus(challenge) {
    for (let i = 0; i < this.person.challenges.length; i++) {
      if (this.person.challenges[i].id === challenge.id) {
        if (challenge.status == this.STATUS_CHECK) {
          this.person.challenges[i].status = this.STATUS_UNCHECK;

        } else {
          this.person.challenges[i].status = this.STATUS_CHECK;
        }
      }
    }
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].id == this.person.id) {
        this.persons[i] = this.person;
      }
    }

    this.updateCountMissions();

    this.updateChallenges();
  }

  private updateCountMissions() {
    this.countMissions = this.person.challenges.filter(c => c.status === this.STATUS_CHECK).length;
  }
}
