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
  
  ionViewWillEnter() {
    this.ngOnInit()
  }

  ngOnInit() {
    this.storage.ready().then(() => {
      this.storage.get('persons').then((val) => {
        this.registeredUsers = val;
        if (val === null || val.length === 0) {
          this.hasRegistered = false;
        } else {
          this.hasRegistered = true;
        }
      });
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
    let people;
    this.storage.ready().then(() => {
      this.storage.get('persons').then((val) => {
        console.log('persons is 2 ', val);
        people = val;
        this.storage.set('persons', people).then(() => {
          console.log("now really leaving")
          this.navCtrl.setDirection('forward');
          this.navCtrl.navigateForward('/home/register', );
        });
      });
    });
    
  }

}
