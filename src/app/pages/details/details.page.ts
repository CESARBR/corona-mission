import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  data: any;
  person: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
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

  call() {
    console.log("TODO");
    // this.callNumber.callNumber(this.person.phone, true)
    // .then(res => console.log('Launched dialer!', res))
    // .catch(err => console.log('Error launching dialer', err));
  }

  updatePerson() {
    console.log("TODO");
  }

}
