import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { FirebaseGoogleAuthService } from 'src/app/services/firebase/firebase-google-auth.service';
import { CoronaToast } from 'src/app/shared/corona-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private googleAuth: FirebaseGoogleAuthService,
    private coronaToast: CoronaToast
  ) { }

  ngOnInit() {
  }

  async loginFacebook() {
    this.coronaToast.showInfo('TODO - Login Facebook');
  }

  async loginGoogle() {
    this.googleAuth
    .doAuth()
    .then(this.goToHome.bind(this))
    .catch(error =>{
      console.error(error)
      this.coronaToast.showError("Could not perform authetication.");
    })
  }

  loginEmail() {
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward('/login/login-email');
  }

  private goToHome(){
    this.navCtrl.navigateForward('/home');
  }

}
