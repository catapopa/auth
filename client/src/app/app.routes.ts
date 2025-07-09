import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards';
import { LoginComponent } from './features/auth/components/login.component';
import { DashboardComponent } from './features/auth/pages/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];
