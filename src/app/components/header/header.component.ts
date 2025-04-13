import { Component, Input } from '@angular/core';
import { VignetteComponent } from "./vignette/vignette.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [VignetteComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  @Input('headerSettings') headerSettings: { showNavBar: boolean } = { showNavBar: true };
  displayName: string =  'Soupart-Bautista';

  constructor(
    private router: Router
  ) {}

  toggleNavBar() {
    this.headerSettings.showNavBar = !this.headerSettings.showNavBar;
  }

  navigateHome() {
    this.router.navigateByUrl('home');
  }
}
