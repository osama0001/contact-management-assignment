import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'contact-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'contact-dashboard',
    loadComponent: () =>
      import('./layout/contact-dashboard/contact-dashboard').then((m) => m.ContactDashboard),
  },
];
