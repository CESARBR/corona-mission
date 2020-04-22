import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginEmailPage } from './login-email.page';
import { LoggedGuardService } from 'src/app/services/logged-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginEmailPage,
    canActivate: [LoggedGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginEmailPageRoutingModule {}
