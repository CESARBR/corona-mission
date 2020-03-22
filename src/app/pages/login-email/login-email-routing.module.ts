import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginEmailPage } from './login-email.page';

const routes: Routes = [
  {
    path: '',
    component: LoginEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginEmailPageRoutingModule {}
