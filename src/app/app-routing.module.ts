import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login-email',
    loadChildren: () => import('./pages/login-email/login-email.module').then( m => m.LoginEmailPageModule)
  }
  // ,
  // {
  //   path: 'about',
  //   loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  // },
  // ,
  // {
  //   path: 'settings',
  //   loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  // },
  // {
  //   path: 'feed',
  //   loadChildren: () => import('./pages/feed/feed.module').then( m => m.FeedPageModule)
  // }
  // ,
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'index',
  //   loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: 'signup',
  //   loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  // },
  // {
  //   path: 'welcome',
  //   loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
