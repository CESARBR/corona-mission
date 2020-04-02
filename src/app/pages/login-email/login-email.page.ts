import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController, NavController } from '@ionic/angular';
import { Item } from '../../models';
import { AuthFirebaseService } from 'src/app/services/firebase/firebase-auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.page.html',
  styleUrls: ['./login-email.page.scss'],
})

export class LoginEmailPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  loading: any;

  items: Item[] = [];
  newItem: Item = <Item>{};

  constructor(public formBuilder: FormBuilder, private toastCtrl: ToastController,
    private authFirebaseService: AuthFirebaseService, private nvc: NavController,
    public loadingController: LoadingController) {
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

  async submitForm() {

    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      
      const toast = await this.toastCtrl.create({
        message: 'Dados inválidos.',
        duration: 3000,
        color: "warning"
      });
      toast.present();

      return false;
    } else {
      this.loading = await this.loadingController.create({
        message: 'Aguarde...',
      });
      await this.loading.present();
      await this.authFirebaseService.doLoginEmail(this.ionicForm.value.email, this.ionicForm.value.password).then((res) => {
        this.loading.dismiss();
        this.nvc.navigateForward('/home');
      });
    }
  }

}
