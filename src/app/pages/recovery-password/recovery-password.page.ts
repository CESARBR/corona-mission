import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { AuthFirebaseService } from '../../services/firebase/firebase-auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.page.html',
  styleUrls: ['./recovery-password.page.scss'],
})
export class RecoveryPasswordPage implements OnInit {

  private readonly ERR_CODE_USER_NOT_FOUND = "auth/user-not-found";
  private readonly ERR_CODE_INVALID_EMAIL = "auth/invalid-email";

  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController,
    private authFirebaseService: AuthFirebaseService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async submitForm() {
    this.isSubmitted = true;
    if (this.ionicForm.valid) {

      this.authFirebaseService.sendPasswordResetEmail(this.ionicForm.value.email).then(async res => {

        const toast = await this.toastCtrl.create({
          message: "Solicitação enviada para seu email",
          duration: 3000,
          color: "success"
        });

        toast.present();

        this.navCtrl.navigateRoot('/login-email');
      }).catch(async err => {

        let msg = "Erro ao enviar código";

        if (err && err.code) {

          switch (err.code) {
            case this.ERR_CODE_USER_NOT_FOUND:
              msg = "Não foi encontrado um email correspondente";
              break;
            case this.ERR_CODE_INVALID_EMAIL:
              msg = "Email inválido";
              break;
            default:
              break;
          }
        }

        const toast = await this.toastCtrl.create({
          message: msg,
          duration: 3000,
          color: "warning"
        });

        toast.present();
      });
    }
  }
}
