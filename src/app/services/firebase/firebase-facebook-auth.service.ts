import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFacebookAuthService {

  constructor(private nvc: NavController) { }

  doAuth(){
    var provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }
}
