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
import { LeaderboardComponent } from './components/chores/leaderboard/leaderboard.component';
import { MyTasksComponent } from './components/chores/tasks/my-tasks/my-tasks.component';
import { AssignTasksComponent } from './components/chores/tasks/assign-tasks/assign-tasks.component';
import { EditTasksComponent } from './components/chores/tasks/edit-tasks/edit-tasks.component';
import { EditMetricsComponent } from './components/chores/tasks/edit-metrics/edit-metrics.component';
import { EditRewardsComponent } from './components/chores/rewards/edit-rewards/edit-rewards.component';
import { RewardsShopComponent } from './components/chores/rewards/rewards-shop/rewards-shop.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'configure', component: ConfigureComponent, canActivate: [AuthGuard] },
    { path: 'budget', component: BudgetComponent, canActivate: [AuthGuard, ConfigureGuard] },
    { path: 'chores', component: ChoresComponent, canActivate: [AuthGuard, ConfigureGuard] },
    { path: 'chores/leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard, ConfigureGuard] },
    // { path: 'chores/tasks', component: ChoresComponent, canActivate: [AuthGuard, ConfigureGuard] },
    { path: 'chores/my_tasks', component: MyTasksComponent, canActivate: [AuthGuard, ConfigureGuard] },
    { path: 'chores/task_assignment', component: AssignTasksComponent, canActivate: [AuthGuard, ConfigureGuard] },
    { path: 'chores/edit_tasks', component: EditTasksComponent, canActivate: [AuthGuard, ConfigureGuard] },
    { path: 'chores/edit_metrics', component: EditMetricsComponent, canActivate: [AuthGuard, ConfigureGuard] },
    { path: 'chores/edit_rewards', component: EditRewardsComponent, canActivate: [AuthGuard, ConfigureGuard] },
    { path: 'chores/rewards', component: RewardsShopComponent, canActivate: [AuthGuard, ConfigureGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard, ConfigureGuard] },
    { path: '**', component: HomeComponent, canActivate: [AuthGuard, ConfigureGuard] },
];
