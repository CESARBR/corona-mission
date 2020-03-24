import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    loadChildren:() => import('../pages/register/register.module').then(
      m => m.RegisterPageModule
    ),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
