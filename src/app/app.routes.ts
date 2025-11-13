import { Routes } from '@angular/router';
import { reactiveRoutes } from './reactive/reactive.route';

export const routes: Routes = [
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.route').then((m) => m.reactiveRoutes)
  },
  //Esta modulo de ruta se pone con el then porque tiene el export default
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.route'),
  },
  {
    path: 'country',
    loadChildren: () => import('./country/coutry.routes').then((m) => m.countryRoutes)
  },
  { path: '**', redirectTo: 'reactive' }
];
