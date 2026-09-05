import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/public-layout/public-layout.component').then((m) => m.PublicLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/landing/landing.component').then((m) => m.LandingComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
