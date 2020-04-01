import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoveryPasswordPage } from './recovery-password.page';

const routes: Routes = [
  {
    path: '',
    component: RecoveryPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoveryPasswordPageRoutingModule {}
