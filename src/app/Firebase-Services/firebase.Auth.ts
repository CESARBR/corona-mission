import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable()
export class AuthFirebaseService {
    constructor(private nvc: NavController) { }

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

    getCurrentUserId() {

        return "zg1EvNi9Z4VYoWXWcw6Xu5L8GrC2";
        // if (firebase.auth() && firebase.auth().currentUser) {

        //     return firebase.auth().currentUser.uid;
        // }
    }
}