import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, Platform, ToastController } from '@ionic/angular';
import { StorageService, Item } from '../../services/storage.service';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/Firebase-Services/firebase.Auth';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.page.html',
  styleUrls: ['./login-email.page.scss'],
})

export class LoginEmailPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  items: Item[] = [];
  newItem: Item = <Item>{};

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController,
    private authFirebaseService: AuthFirebaseService, private router: Router) {
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {

    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {

      this.authFirebaseService.doLoginEmail(this.ionicForm.value.email, this.ionicForm.value.password).then((res) => {
        this.router.navigateByUrl('/home');
      });
    }
  }

}
