import { NgModule } from '@angular/core';
import { DataResolverService } from './resolver/data-resolver.service';
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
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'login-email',
    loadChildren: () => import('./pages/login-email/login-email.module').then( m => m.LoginEmailPageModule)
  },
  {
    path: 'details/:id',
    resolve: {
      idContact: DataResolverService
    },
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  // ,
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'recovery-password',
    loadChildren: () => import('./recovery-password/recovery-password.module').then( m => m.RecoveryPasswordPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
