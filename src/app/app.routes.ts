import { Routes } from '@angular/router';
import { BudgetComponent } from './components/budget/budget.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ChoresComponent } from './components/chores/chores.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent}
    { path: 'budget', component: BudgetComponent },
    { path: 'chores', component: ChoresComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '**', component: HomeComponent },
];
