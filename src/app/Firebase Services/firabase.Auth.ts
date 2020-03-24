import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp(environment.firebase);

export class AuthServices {
    constructor() { }

    doLogin(email, password) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(
                    res => resolve(res),
                    err => reject(err)).catch(error => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode);
                        console.log(errorMessage);
                    })
        })
    }

    doRegister(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(
                    res => {
                        res.user.updateProfile({
                            displayName: value.name
                        }).then(function () {
                            // Update successful.
                        }).catch(function (error) {
                            // An error happened.
                        });;
                        resolve(res)
                    },
                    err => {
                        reject(err)
                    }).catch(error => {
                        console.log(error.code);
                        console.log(error.message);
                        reject(error);
                    }
                    );
        })
    }
}