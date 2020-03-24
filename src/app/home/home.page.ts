import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';
import { DatabaseServices } from '../Firebase Services/firebase.Database';

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

  ionViewWillEnter() {

    const ds = new DatabaseServices();

    const a = ds.readItemByKey('/users/zg1EvNi9Z4VYoWXWcw6Xu5L8GrC2/velhos', '').then((res) => {

      this.hasRegistered = Boolean(res && res.val());

      if (this.hasRegistered) {
        this.registeredUsers = Object.values(res.val());
      }
      //this.loadPersons();
      console.log("teste");
      console.log(res.val());
    });


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
