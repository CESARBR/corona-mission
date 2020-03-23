import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SignupPageRoutingModule
    
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
