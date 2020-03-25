import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditContactPage } from './edit-contact.page';
import { DataResolverService } from 'src/app/resolver/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    resolve: {
      idContact: DataResolverService
    },
    component: EditContactPage,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditContactRoutingModule {}
