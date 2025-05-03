import { Routes } from '@angular/router';
import { BudgetComponent } from './components/budget/budget.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ChoresComponent } from './components/chores/chores.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ConfigureComponent } from './components/configure/configure.component';
import { ConfigureGuard } from './guards/configure.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'configure', component: ConfigureComponent, canActivate: [AuthGuard] },
    { path: 'budget', component: BudgetComponent, canActivate: [AuthGuard, ConfigureGuard] },
    { path: 'chores', component: ChoresComponent, canActivate: [AuthGuard, ConfigureGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard, ConfigureGuard] },
    { path: '**', component: HomeComponent, canActivate: [AuthGuard, ConfigureGuard] },
];
