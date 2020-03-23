import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp(environment.firebase);

export class DatabaseServices {
    angularFirestore: AngularFirestore
    constructor(

    ) { }



    saveUser(userObject) {
        let storageRef = firebase.database()//.ref();
        let storageRef2 =storageRef.ref();
        let imageRef = storageRef2.child('users');
        imageRef.push(userObject);

    }

}