import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      relationship: ['', Validators.required],
    })
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
      this.navCtrl.setDirection('forward');
      this.navCtrl.navigateForward('/home');
      console.log(this.ionicForm.value)
    }
  }

}
