import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'feed',
        loadChildren:() => import('../pages/feed/feed.module').then(
          m => m.FeedPageModule
        )
      },
      {
        path: 'settings',
        loadChildren:() => import('../pages/settings/settings.module').then(
          m => m.SettingsPageModule
        )
      },
      {
        path: 'about',
        loadChildren:() => import('../pages/about/about.module').then(
          m => m.AboutPageModule
        )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
