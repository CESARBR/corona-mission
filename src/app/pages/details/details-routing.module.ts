import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsPage } from './details.page';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DetailsPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsPageRoutingModule {}
