import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { LoggedGuardService } from 'src/app/services/logged-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'login-email',
    loadChildren:() => import('../login-email/login-email.module').then(
      m => m.LoginEmailPageModule
    ),
    canActivate: [LoggedGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
