import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    async loadComponent() {
      return import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      );
    },
  },
];
