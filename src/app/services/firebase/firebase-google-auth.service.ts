import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';
import * as authConfig from '../../../auth-config.json';

@Injectable({
  providedIn: 'root'
})
export class FirebaseGoogleAuthService {

  constructor(private nvc: NavController) { }

  async doAuth() {
    try {
      const gplus = await GooglePlus.login({
        'webClientId': authConfig.webClientId,
        'offline': true,
        'scopes': 'profile email'
      })

      return await firebase.auth().signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplus.idToken)
      )
    } catch (err) {
      throw err
    }
  }
}
