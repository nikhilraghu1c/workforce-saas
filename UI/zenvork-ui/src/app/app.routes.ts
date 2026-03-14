import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
    },
    {
        path: 'login',
        loadComponent: () => import('./modules/auth/pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'home',
        canActivate: [authGuard],
        loadComponent: () => import('./modules/home/pages/home.component').then(m => m.HomeComponent)
    }
];
