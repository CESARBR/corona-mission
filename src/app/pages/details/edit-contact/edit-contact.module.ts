import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditContactRoutingModule } from './edit-contact-routing.module';

import { EditContactPage } from './edit-contact.page';
import { BrMaskerModule } from 'br-mask';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
    EditContactRoutingModule
  ],
  declarations: [EditContactPage],
  providers: [WebView]
})
export class EditContactModule {}