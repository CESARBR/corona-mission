import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SampleJson from '../../../assets/challenges.json';
// import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  data: any;
  person: any;
  challenges: any;
  constructor(private route: ActivatedRoute) { 
    
  }

  
  ngOnInit() {
    this.challenges = [SampleJson[Math.floor((Math.random() * SampleJson.length) + 0)],
      SampleJson[Math.floor((Math.random() * SampleJson.length) + 0)],
      SampleJson[Math.floor((Math.random() * SampleJson.length) + 0)]];
    console.log(this.challenges)
    console.log(SampleJson);
    if (this.route.snapshot.data['special']) {
      this.data = this.route.snapshot.data['special'];
      this.person =
        {
          id: 12,
          name: "João da Silva",
          relationship: "Pai",
          mission: "Realizar primeira missão",
          mission_color: "dark",
          mission_label_color: "dark",
          avatar: "../../assets/img/person_icon.png",
          phone: "15981272667",
          missions: 25
        };

    }
  }

  getThreeChallenges() {
    return [SampleJson[Math.floor((Math.random() * SampleJson.length) + 0)],
      SampleJson[Math.floor((Math.random() * SampleJson.length) + 0)],
      SampleJson[Math.floor((Math.random() * SampleJson.length) + 0)]];
  }

  

  call() {
    console.log("TODO");
    // this.callNumber.callNumber(this.person.phone, true)
    // .then(res => console.log('Launched dialer!', res))
    // .catch(err => console.log('Error launching dialer', err));
  }

  updatePerson() {
    console.log("TODO");
  }

  changeStatus(challenge) {
    if (challenge.status == "checkmark-outline") {
      challenge.status = "ellipse-outline";
    } else {
      challenge.status = "checkmark-outline";
    }
  }


}
