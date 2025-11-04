import { Routes } from '@angular/router';
import { RegisterPage } from './pages/register/register.page';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'verify-otp',
    loadComponent: () => import('./verify-otp/verify-otp.page').then( m => m.VerifyOtpPage)
  },
 
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./product/product.page').then(m => m.ProductPage)
  },
  {
    path: 'faqs',
    loadComponent: () => import('./pages/faqs/faqs.page').then( m => m.FaqsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then( m => m.AboutPage)
  },

  {
    path: 'faqs',
    loadComponent: () => import('./pages/faqs/faqs.page').then(m => m.FaqsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then(m => m.AboutPage)
  },

  



];
