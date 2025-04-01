import { Component, Input } from '@angular/core';

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
}
