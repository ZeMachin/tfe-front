import { Component, Input, OnInit } from '@angular/core';
import { NavBarItemComponent } from './nav-bar-item/nav-bar-item.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  imports: [NavBarItemComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.less',
})
export class NavBarComponent implements OnInit {
  @Input('headerSettings') headerSettings: { showNavBar: boolean } = {
    showNavBar: true,
  };
  expand: boolean = false;

  navBarItems: NavBarItem[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const chores: NavBarItem = {
      label: 'Chores',
      icon: 'list-check',
      link: 'chores',
      displayCondition: () => !!this.userService.member,
      items: [
        {
          name: 'My tasks',
          link: 'my_tasks',
          displayCondition: () => !!this.userService.member,
        },
        {
          name: 'Assign tasks',
          link: 'task_assignment',
          displayCondition: () =>
            this.userService.member?.status.name === 'Adult',
        },
        {
          name: 'Edit tasks',
          link: 'edit_tasks',
          displayCondition: () =>
            this.userService.member?.status.name === 'Adult',
        },
        {
          name: 'Edit metrics',
          link: 'edit_metrics',
          displayCondition: () =>
            this.userService.member?.status.name === 'Adult',
        },
        {
          name: 'Edit rewards',
          link: 'edit_rewards',
          displayCondition: () =>
            this.userService.member?.status.name === 'Adult' &&
            !!this.userService.family?.settings.rewards,
        },
        {
          name: 'Rewards',
          link: 'rewards',
          displayCondition: () =>
            !!this.userService.member &&
            !!this.userService.family?.settings.rewards,
        },
        {
          name: 'Leaderboard',
          link: 'leaderboard',
          displayCondition: () =>
            !!this.userService.member &&
            !!this.userService.family?.settings.leaderboard,
        },
      ],
    };

    // const budget: NavBarItem = {
    //   label: 'Budget',
    //   icon: 'euro',
    //   link: 'budget'
    // };

    const users: NavBarItem = {
      label: 'Users',
      icon: 'users',
      link: 'users',
      displayCondition: () => !!this.userService.member,
      items: [
        {
          name: 'Manage users',
          link: 'user_selection',
          displayCondition: () => !!this.userService.member,
        },
      ],
    };

    this.navBarItems = [
      chores,
      // budget,
      users,
    ];
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
  displayCondition?: () => boolean;
}

export interface NavBarSubItem {
  name: string;
  link: string;
  displayCondition?: () => boolean;
}
