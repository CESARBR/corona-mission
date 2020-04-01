import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { FirebaseGoogleAuthService } from 'src/app/services/firebase/firebase-google-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public toastController: ToastController,
    private navCtrl: NavController,
    private googleAuth: FirebaseGoogleAuthService
    ) { }

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
    this.googleAuth
    .doAuth()
    .then(this.goToHome.bind(this))
    .catch(error =>{
      console.error(error)
      this.showErrorToast("Could not perform authetication.");
    })
  }

  async showErrorToast(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }

  loginEmail() {
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward('/login/login-email');
  }

  private goToHome(){
    this.navCtrl.navigateForward('/home');
  }

}
