import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarItem } from '../nav-bar.component';

@Component({
  selector: 'app-nav-bar-item, [nav-bar-item]',
  imports: [],
  templateUrl: './nav-bar-item.component.html',
  styleUrl: './nav-bar-item.component.less'
})
export class NavBarItemComponent {
  @Input('item') item!: NavBarItem;
  @Input('iconOnly') iconOnly: boolean = true;

  constructor(
    private router: Router
  ) {}

  navigate() {
    this.router.navigateByUrl(this.item.link);
  }
}
