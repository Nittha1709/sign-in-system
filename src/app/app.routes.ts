import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { InfoPageComponent } from './components/info-page/info-page.component';
import { AuthGuard } from './services/auth.guard';
export const routes: Routes = [
  { path: '', component: LoginFormComponent }, 
  { path: 'login', component: LoginFormComponent }, 
  { path: 'info', component: InfoPageComponent ,  canActivate: [AuthGuard]}, 
  { path: '**', redirectTo: '' }, 
];
