import { Component } from '@angular/core';
import { NavBarItemComponent } from './nav-bar-item/nav-bar-item.component';

@Component({
  selector: 'app-nav-bar',
  imports: [NavBarItemComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.less'
})
export class NavBarComponent {
  navBarItems: NavBarItem[] = [
    {
      label: 'Chores',
      icon: 'home',
      link: 'chores'
    },
    {
      label: 'Budget',
      icon: 'euro',
      link: 'budget'
    },
    {
      label: 'Settings',
      icon: 'cog',
      link: 'settings'
    }
  ];
}

interface NavBarItem {
  label: string;
  icon: string;
  link: string;
}