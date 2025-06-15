import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild  {
  constructor(private authService: AuthService, private router: Router) {}

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
    if (this.authService.isAuthenticatedUser) {
      return this.checkPermissions(route);
      // TODO: create forbidden access page
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }

  checkPermissions(route: ActivatedRouteSnapshot): boolean {
    const url = route.url[0]?.path;
    const adminLinks: string[] = [
      'task_assignment',
      'edit_tasks',
      'edit_metrics',
      'edit_rewards',
      'settings',
    ];
    if(adminLinks.includes(url)) return false;
    else return true;
  }
}