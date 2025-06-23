import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { NUMBER_OF_CONFIGURATION_STEPS } from '../utils/const';

@Injectable({
  providedIn: 'root'
})
export class ConfigureGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if(this.userService.family) {
      if(this.userService.family.configStep < NUMBER_OF_CONFIGURATION_STEPS) {
        this.router.navigateByUrl('configure');
        return false;
      }
    } else {
      this.userService.logout();
      return false;
    }
    return true;
  }
} 