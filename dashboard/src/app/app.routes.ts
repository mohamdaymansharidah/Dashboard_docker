import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth').then((m) => m.Auth),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register/register').then((m) => m.Register),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./auth/dashboard/dashboard').then((m) => m.Dashboard),
    children: [
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./auth/reset-password/reset-password').then((m) => m.ResetPassword),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./auth/forget-password/forget-password').then((m) => m.ForgetPassword),
      },
    ],
  },
];
