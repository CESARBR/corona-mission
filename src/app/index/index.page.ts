import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { DatabaseProvider } from '../services/sqlite/database.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(private storage: StorageService, private navCtrl: NavController, private database: DatabaseProvider) { }

  ionViewWillEnter() {
    this.storage.isSeenSlides().then((val) => { 
      if (val) {

        this.database.createDatabase().then(() => {
          this.navCtrl.navigateRoot('/home');
        }).catch((err) => {
          console.log(err);
          console.log("enviar msg de erro");
        })
      }
    });
  }

  ngOnInit() {

  }

}
