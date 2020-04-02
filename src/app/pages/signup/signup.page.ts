import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';
import { AuthFirebaseService } from 'src/app/services/firebase/firebase-auth.service';
import { CoronaToast } from 'src/app/shared/corona-toast';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController,
    private authFirebaseService: AuthFirebaseService, private coronaToast: CoronaToast) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      name: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: passwordConfirmation } = formGroup.get('passwordConfirmation');
    return password === passwordConfirmation ? null : { passwordNotMatch: true };
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {

      this.authFirebaseService.doRegister(this.ionicForm.value).then(res => {
        this.navCtrl.setDirection('forward');
        this.navCtrl.navigateForward('/home');
        console.log(this.ionicForm.value);
      }).catch(error =>{
        console.error(error)
        let msg = error.code == 'auth/email-already-in-use' ? 'O email já está sendo usado.' : error.message
        this.coronaToast.showError(msg);
      });
    }
  }

}
