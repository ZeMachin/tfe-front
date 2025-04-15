import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FamilyMember } from '../../models/FamilyMember';
import { Family } from '../../models/Family';

@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  @Input('headerSettings') headerSettings: { showNavBar: boolean } = { showNavBar: true };
  family?: Family;
  member?: FamilyMember;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.family = this.userService.family;
    this.member = this.userService.member;
  }

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
