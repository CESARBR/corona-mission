import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from './auth.service';
import { AuthFirebaseService } from '../Firebase-Services/firebase.Auth';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authFirebaseService: AuthFirebaseService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!this.authFirebaseService.getCurrentUserId()) {
      this.router.navigate(["login-email"]);
      return false;
    }

    return true;
  }
}