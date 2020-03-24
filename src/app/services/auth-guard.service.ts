import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (false) {//Wait for login implementation
    // if (!this.authService.loggedUser) {
      this.router.navigate(["login-email"]);
      return false;
    }

    return true;
  }
}