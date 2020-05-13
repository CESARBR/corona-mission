import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { DatabaseProvider } from 'src/app/services/sqlite/database.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private navCtrl: NavController, private storage: StorageService, private database: DatabaseProvider) { }

  ngOnInit() {
  }

  navigateToHomePage() {
    this.storage.markSeenSlides().then(async () => {
      await this.database.createDatabase();
      this.navCtrl.navigateRoot('/home');
    });
  }

}
