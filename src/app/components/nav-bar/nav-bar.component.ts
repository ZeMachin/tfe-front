import { Component, Input } from '@angular/core';
import { NavBarItemComponent } from './nav-bar-item/nav-bar-item.component';

@Component({
  selector: 'app-nav-bar',
  imports: [NavBarItemComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.less'
})
export class NavBarComponent {
  @Input('headerSettings') headerSettings: { showNavBar: boolean } = { showNavBar: true };
  expand: boolean = false;
  
  navBarItems: NavBarItem[] = [
    {
      label: 'Chores',
      icon: 'list-check',
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

  toggleNavBar() {
    // this.headerSettings.showNavBar = !this.headerSettings.showNavBar;
    this.expand = !this.expand;
  }

}

interface NavBarItem {
  label: string;
  icon: string;
  link: string;
}