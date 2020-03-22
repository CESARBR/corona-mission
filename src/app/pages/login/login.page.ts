import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public toastController: ToastController, private navCtrl: NavController) { }

  ngOnInit() {
  }

  async loginFacebook() {
    const toast = await this.toastController.create({
      message: 'TODO - Login Facebook',
      duration: 2000
    });
    toast.present();
  }

  async loginGoogle() {
    const toast = await this.toastController.create({
      message: 'TODO - Login Google',
      duration: 2000
    });
    toast.present();
  }

  loginEmail() {
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward('/login/login-email');
  }

  

}
