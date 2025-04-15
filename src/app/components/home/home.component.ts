import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

const NUMBER_OF_CONFIGURATION_STEPS = 5;

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.userService.family) {
      this.messageService.add({
        severity: 'error',
        summary: 'Oops',
        detail: "Something went wrong with the authentication: your family wasn't retrieved properly. \nPlease try again."
      });
      this.authService.logout();
    } else if(this.userService.family.configStep < NUMBER_OF_CONFIGURATION_STEPS) {
      this.router.navigateByUrl('configure');
    }
      
  }
}
