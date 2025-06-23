import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService, 
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkAuth(route);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkAuth(route);
  }

  private checkAuth(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated) {
      if (!this.checkPermissions(route)) {
        this.router.navigateByUrl('home'); // TODO: create forbidden access page and redirect there
        return false;
      }
      return true
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigateByUrl('login');
      return false;
    }
  }

  checkPermissions(route: ActivatedRouteSnapshot): boolean {
    const url = route.url.join('/');
    const adminLinks: string[] = [
      'chores/task_assignment',
      'chores/edit_tasks',
      'chores/edit_metrics',
      'chores/edit_rewards',
      'settings',
    ];
    return !adminLinks.includes(url) || this.userService.isAdult;
  }
}