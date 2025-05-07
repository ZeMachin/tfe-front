import { Component, Input, OnInit } from '@angular/core';
import { NavBarItemComponent } from './nav-bar-item/nav-bar-item.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  imports: [NavBarItemComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.less'
})
export class NavBarComponent implements OnInit {
  @Input('headerSettings') headerSettings: { showNavBar: boolean } = { showNavBar: true };
  expand: boolean = false;

  navBarItems: NavBarItem[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    //TODO: need to refresh this (using signals) when user profile changes
    const user = this.userService.member;
    if (user) {
      const chores: NavBarItem = {
        label: 'Chores',
        icon: 'list-check',
        link: 'chores',
        items: [
          {
            name: 'My tasks',
            link: 'my_tasks'
          },
        ]
      };

      const budget: NavBarItem = {
        label: 'Budget',
        icon: 'euro',
        link: 'budget'
      };

      if (user.status.name === 'Adult') {
        chores.items?.push({ name: 'Assign tasks', link: 'task_assignment' });
        chores.items?.push({ name: 'Edit tasks', link: 'edit_tasks' });
        chores.items?.push({ name: 'Edit metrics', link: 'edit_metrics' });
      }

      if (user.status.name === 'Adult' && this.userService.family?.settings.rewards) {
        chores.items?.push({ name: 'Edit rewards', link: 'edit_rewards' });
      }

      if (this.userService.family?.settings.rewards) {
        chores.items?.push({ name: 'Rewards', link: 'rewards' });
      }

      if (this.userService.family?.settings.leaderboard) {
        chores.items?.push({ name: 'Leaderboard', link: 'leaderboard' });
      }

        this.navBarItems = [chores, budget];
    }
  }

  toggleNavBar() {
    // this.headerSettings.showNavBar = !this.headerSettings.showNavBar;
    this.expand = !this.expand;
  }

}

export interface NavBarItem {
  label: string;
  icon: string;
  link: string;
  items?: NavBarSubItem[];
}

interface NavBarSubItem {
  name: string;
  link: string;
}