import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';

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
    this.loadPersons();
  }

  ngOnInit() { 
  }

  loadPersons(){
      this.storageService.getPersons().then((persons) => {
  
        this.hasRegistered = !persons || persons.length == 0;

        if (!this.hasRegistered) {
          this.hasRegistered = false;
          return;
        }
  
        this.registeredUsers = persons.map(person => {
  
          return {
            id: person.id,
            name: person.name,
            relationship: person.relationship,
            mission: "Realizar primeira missão",
            mission_color: "dark",
            mission_label_color: "dark",
            avatar: "../../assets/img/person_icon.png"
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
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward('/home/register', );
  }

}
