import { Component } from '@angular/core';
import { NavBarSubItem } from '../nav-bar/nav-bar.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chores',
  imports: [],
  templateUrl: './chores.component.html',
  styleUrl: './chores.component.less'
})
export class ChoresComponent {
  chores: NavBarSubItem[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const user = this.userService.member;
    if (user) {
      this.chores.push({
        name: 'My tasks',
        link: 'my_tasks'
      })

      if (user.status.name === 'Adult') {
        this.chores.push({ name: 'Assign tasks', link: 'task_assignment' });
        this.chores.push({ name: 'Edit tasks', link: 'edit_tasks' });
        this.chores.push({ name: 'Edit metrics', link: 'edit_metrics' });
      }

      if (user.status.name === 'Adult' && this.userService.family?.settings.rewards) {
        this.chores.push({ name: 'Edit rewards', link: 'edit_rewards' });
      }

      if (this.userService.family?.settings.rewards) {
        this.chores.push({ name: 'Rewards', link: 'rewards' });
      }

      if (this.userService.family?.settings.leaderboard) {
        this.chores.push({ name: 'Leaderboard', link: 'leaderboard' });
      }
    };
  }
}


