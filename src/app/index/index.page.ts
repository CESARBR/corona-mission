import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(private storage: Storage, private navCtrl: NavController) { }

  ngOnInit() {
    this.storage.ready().then(() => {
      this.storage.get('seenSlides').then((val) => {
        if (val) {
          this.navCtrl.setDirection('forward');
          this.navCtrl.navigateForward('/home');
        }
      });
    });
  }

}
