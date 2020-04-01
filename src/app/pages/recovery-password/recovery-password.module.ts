import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoveryPasswordPageRoutingModule } from './recovery-password-routing.module';

import { RecoveryPasswordPage } from './recovery-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RecoveryPasswordPageRoutingModule
  ],
  declarations: [RecoveryPasswordPage]
})
export class RecoveryPasswordPageModule {}
