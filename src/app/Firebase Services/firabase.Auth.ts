import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp(environment.firebase);

export class AuthServices {
    constructor() { }

    doLoginEmail(email, password) {
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

    doSignOutEmail() {
        firebase.auth().signOut().then(function () {
            console.log('signout successuful');
        }).catch(function (error) {
            console.log('signout failed');
        });
    }

    emailVerification() {
        var user = firebase.auth().currentUser;
        var response;
        user.sendEmailVerification().then(function () {
            response='';
            console.log('Email sent.');
        }).catch(function (error) {
            console.log('An error happened.');
            response='An error happened.';
        });
        return response;
    }

    passwordRecovery(emailAddress) {
        var auth = firebase.auth();
        
        var response;
        auth.sendPasswordResetEmail(emailAddress).then(function () {
            response='';
            console.log('Email sent.');
        }).catch(function (error) {
            console.log('An error happened.');
            response='An error happened.';
        });
        return response;
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