import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  // Public Route
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/pages/login/login.component').then(m => m.LoginComponent),
  },

  // Protected Routes with Layout
  {
    path: '',
    loadComponent: () => import('./modules/layout/pages/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./modules/home/pages/home.component').then(m => m.HomeComponent),
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
