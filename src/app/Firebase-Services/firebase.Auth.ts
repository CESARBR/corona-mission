import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Injectable()
export class AuthFirebaseService {
    constructor(private nvc: NavController, private toastCtrl: ToastController,) { }

    async doLoginEmail(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password).catch(async (error) => {
            var errorCode = error.code;
            var errorMessage = error.message; 
            console.log(errorCode, errorMessage);
            const toast = await this.toastCtrl.create({
                //TODO verificar se é quantidade de tentativas ou email/senha inválidos
                message: 'Email ou senha inválidos.',
                duration: 3000,
                color: "danger"
              });
              toast.present();
            throw error;
          });
    }

    doSignOutEmail() {
        firebase.auth().signOut().then(() => {
            console.log('signout successuful');
            this.nvc.navigateRoot('/login-email');
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
                            resolve(true);
                        }).catch(function (error) {
                            reject(false);
                        });;
                        resolve(res);
                    },
                    err => {
                        reject(err);
                    }).catch(error => {
                        console.log(error.code);
                        console.log(error.message);
                        reject(error);
                    }
                    );
        })
    }

    getCurrentUserId() {

        if (firebase.auth() && firebase.auth().currentUser) {

            return firebase.auth().currentUser.uid;
        }
    }
}