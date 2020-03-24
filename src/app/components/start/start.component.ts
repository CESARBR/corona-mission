import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {

  constructor(private navCtrl: NavController, private storage: Storage) { }

  ngOnInit() {}

  navigateToLoginPage() {
    this.storage.ready().then(() => {
      this.storage.set('seenSlides', true).then(() => {
        this.navCtrl.setDirection('forward');
        this.navCtrl.navigateForward('/home');
      });
    });
  }

}
