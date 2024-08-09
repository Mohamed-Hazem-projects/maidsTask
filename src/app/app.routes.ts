import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: "Users",
    pathMatch: "full"
  },
  {
    path: 'Users',
    loadComponent: () => import('./users-list/users-list.component')
      .then(r => r.UsersListComponent)
  },
  {
    path: 'Users/User/:id',
    loadComponent: () => import('./user-details/user-details.component')
      .then(r => r.UserDetailsComponent)
  },
  {
    path: '**',
    redirectTo: "Users",
    pathMatch: "full"
  }
];
