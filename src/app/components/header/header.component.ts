import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  @Input('headerSettings') headerSettings: { showNavBar: boolean } = { showNavBar: true };
  displayName: string =  'Soupart-Bautista';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleNavBar() {
    this.headerSettings.showNavBar = !this.headerSettings.showNavBar;
  }

  navigateHome() {
    this.router.navigateByUrl('home');
  }

  logout() {
    this.authService.logout();
  }
}
