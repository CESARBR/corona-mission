import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  hasRegistered = true;

  registeredUsers = [];

  constructor(private navCtrl: NavController, private dataService: DataService) { }

  ngOnInit() {
    this.registeredUsers = [
      {
        id: 12,
        name: "João da Silva",
        relationship: "Pai",
        mission: "Realizar primeira missão",
        mission_color: "dark",
        mission_label_color: "dark",
        avatar: "../../assets/img/person_icon.png"
      },
      {
        id: 12,
        name: "João da Silva",
        relationship: "Pai",
        mission: "Realizar primeira missão",
        mission_color: "dark",
        mission_label_color: "dark",
        avatar: "../../assets/img/person_icon.png"
      }
    ]
  }

  openDetail(id) {
    console.log("Opening ... " + id)
    this.dataService.setData(id, id);
    let str = 'details/' + id;
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward(str);
  }

  addPerson() {
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward('/home/register', );
  }

}
