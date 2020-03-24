import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';
import {DatabaseServices} from '../Firebase-Services/firebase.Database'
import {AuthServices} from '../Firebase-Services/firebase.Auth'


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  hasRegistered = true;

  registeredUsers = [];

  constructor(private navCtrl: NavController, private dataService: DataService, 
    private storageService: StorageService) { 
  }

  async ionViewWillEnter() {
    const databaseCtrl = new DatabaseServices();
    const authCtrl = new AuthServices();
    const userItens = await databaseCtrl.readItemByKey('/users/'+authCtrl.getCurrentUserId(),'');
    this.loadPersons();
  }

  ngOnInit() { 
  }

  loadPersons(){

      this.storageService.getPersons().then((persons) => {
  
        this.hasRegistered = Boolean(persons && persons.length > 0);

        if (this.hasRegistered) {
          this.registeredUsers = persons;
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
