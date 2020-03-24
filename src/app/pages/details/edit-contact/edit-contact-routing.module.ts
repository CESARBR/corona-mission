import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditContactPage } from './edit-contact.page';

const routes: Routes = [
  {
    path: '',
    component: EditContactPage,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditContactRoutingModule {}
