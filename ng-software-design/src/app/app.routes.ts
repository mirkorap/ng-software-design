import { Routes } from '@angular/router';

export default [
  {
    path: 'auth',
    loadChildren: (): unknown => import('@auth/auth.routes'),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
] as Routes;
