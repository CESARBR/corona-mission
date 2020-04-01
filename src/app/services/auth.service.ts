import { Injectable } from '@angular/core';
import { Item } from '../models';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser: Item;

  constructor(private nvc: NavController) { }

  login (user: Item) {
    this.loggedUser = user;
  }

  logout () {
    this.loggedUser = null;
    this.nvc.navigateRoot('/login-email');
  }
}
