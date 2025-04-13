import { Routes } from '@angular/router';
import { BudgetComponent } from './components/budget/budget.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ChoresComponent } from './components/chores/chores.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'budget', component: BudgetComponent, canActivate: [AuthGuard] },
    { path: 'chores', component: ChoresComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: '**', component: HomeComponent, canActivate: [AuthGuard] },
];
