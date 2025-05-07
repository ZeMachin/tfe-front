import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-item',
  imports: [],
  templateUrl: './nav-bar-item.component.html',
  styleUrl: './nav-bar-item.component.less'
})
export class NavBarItemComponent {
  @Input('label') label: string = '';
  @Input('icon') icon: string = '';
  @Input('link') link: string = '';
  @Input('iconOnly') iconOnly: boolean = true;

  constructor(
    private router: Router
  ) {}

  navigate() {
    this.router.navigateByUrl(this.link);
  }
}
