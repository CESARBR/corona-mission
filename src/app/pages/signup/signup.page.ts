import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController } from '@ionic/angular';
import { AuthServices } from '../../Firebase Services/firabase.Auth'
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController) { }

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
    var authCtrl = new AuthServices();
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      
      authCtrl.doRegister(this.ionicForm.value);
      this.navCtrl.setDirection('forward');
      this.navCtrl.navigateForward('/home');
      console.log(this.ionicForm.value)
    }
  }

}
