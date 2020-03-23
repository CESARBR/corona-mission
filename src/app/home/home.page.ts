import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  hasRegistered = true;

  registeredUsers = [];

  constructor(private navCtrl: NavController, private dataService: DataService, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('persons').then((val) => {
      console.log('persons is', val);
      this.registeredUsers = val;
      if (val === null) {
        this.hasRegistered = false;
      } else {
        this.hasRegistered = true;
      }
    });
    
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
