import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class CoronaToast{
    constructor(private toastController: ToastController){}

    async showError(msg: string){
        const toast = await this.toastController.create({
          message: msg,
          duration: 2000,
          color: "danger"
        });
        toast.present();
      }

    async showInfo(msg: string){
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
          });
          toast.present();
    }

}