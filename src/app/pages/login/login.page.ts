import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { FirebaseGoogleAuthService } from 'src/app/services/firebase/firebase-google-auth.service';
import { CoronaToast } from 'src/app/shared/corona-toast';
import { LoadingController } from '@ionic/angular';
import { FirebaseFacebookAuthService } from 'src/app/services/firebase/firebase-facebook-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading: any;

  constructor(
    private navCtrl: NavController,
    private googleAuth: FirebaseGoogleAuthService,
    private facebookAuth: FirebaseFacebookAuthService,
    private coronaToast: CoronaToast,
    public loadingController: LoadingController
  ) { 
  }

  ngOnInit() {
  }

  loginFacebook() {
    this.facebookAuth
    .doAuth()
    .then(this.goToHome.bind(this))
    .catch(error =>{
      console.error(error)
      this.coronaToast.showError("Não foi possível fazer o login.");
    });
  }

  async loginGoogle() {
    this.loading = await this.loadingController.create({
      message: 'Aguarde...',
    });
    
    await this.loading.present();
    this.googleAuth
    .doAuth()
    .then(this.goToHome.bind(this))
    .catch(error =>{
      this.loading.dismiss();
      console.error(error)
      this.coronaToast.showError("Não foi possível fazer o login.");
    });
  }

  loginEmail() {
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward('/login/login-email');
  }

  private goToHome(){
    this.loading.dismiss();
    this.navCtrl.navigateForward('/home');
  }

}
