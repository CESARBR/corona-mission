import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseGoogleAuthService {

  constructor(private nvc: NavController) { }

  doAuth(){
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }
}
