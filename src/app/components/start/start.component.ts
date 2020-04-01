import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {

  constructor(private navCtrl: NavController, private storage: StorageService) { }

  ngOnInit() {}

  navigateToLoginPage() {
    this.storage.markSeenSlides().then(() => {
      this.navCtrl.navigateForward('/login-email');
    });
  }
}
