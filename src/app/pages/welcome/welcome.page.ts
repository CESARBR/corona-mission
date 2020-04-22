import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private navCtrl: NavController, private storage: StorageService) { }

  ngOnInit() {
  }

  navigateToLoginPage() {
    this.storage.markSeenSlides().then(() => {
      this.navCtrl.navigateRoot('/login');
    });
  }

}
