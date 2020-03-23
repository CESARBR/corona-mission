import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BrMaskDirective, BrMaskModel } from 'br-mask';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private navCtrl: NavController, public brMask: BrMaskDirective) { }

  ngOnInit() {
  }

  addPerson() {
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward('/home/register');
  }

}
