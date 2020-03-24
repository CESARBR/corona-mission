import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
<<<<<<< HEAD
import { AuthFirebaseService } from '../Firebase-Services/firebase.Auth';
import { DatabaseServices } from '../Firebase-Services/firebase.Database';
=======
import { StorageService } from '../services/storage.service';
import {database, auth} from '../Firebase-Services/firebase.Services'
>>>>>>> e8d0a0e3e32799b573803f7f56edab02e23fe5cc



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  hasRegistered = true;

  registeredUsers = [];

  constructor(private navCtrl: NavController, private dataService: DataService,
    private authFirebaseService: AuthFirebaseService, private databaseFirebaseService: DatabaseServices) { 
  }

  ionViewWillEnter() {

    this.loadPersons();
  }

  ngOnInit() { 
  }

  loadPersons(){
    this.databaseFirebaseService
    .readItemByKey('/users/'+this.authFirebaseService.getCurrentUserId()+'/contacts', '').then((res) => {

      this.hasRegistered = Boolean(res && res.val());

      if (this.hasRegistered) {
        this.registeredUsers = Object.values(res.val());
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

  logout () {
    this.authFirebaseService.doSignOutEmail();
  }

}
