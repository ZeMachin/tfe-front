import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { NUMBER_OF_CONFIGURATION_STEPS } from '../utils/const';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigureGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if(this.userService.family) {
      if(this.userService.family.configStep < NUMBER_OF_CONFIGURATION_STEPS) {
        this.router.navigateByUrl('configure');
        return false;
      }
    } else {
      this.authService.logout();
      return false;
    }
    return true;
  }
} 