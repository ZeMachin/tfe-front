import { Component, OnInit } from '@angular/core';
import { UserSelectionVignetteComponent } from '../../user-selection/user-selection-vignette/user-selection-vignette.component';
import { MessageService } from 'primeng/api';
import { Family } from '../../../models/Family';
import { FamilyMember } from '../../../models/FamilyMember';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  imports: [UserSelectionVignetteComponent],
  providers: [MessageService],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.less',
})
export class ManageUsersComponent implements OnInit {
  family: Family;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.family = this.userService.family!;
  }

  ngOnInit(): void {
    if (!this.userService.family) {
      this.messageService.add({
        severity: 'error',
        summary: 'Oops',
        detail:
          "Something went wrong with the authentication: your family wasn't retrieved properly. \nPlease try again.",
      });
      this.authService.logout();
    }
  }

  userSelect(member: FamilyMember) {
    this.router.navigateByUrl('users/user_profile', { data: { member } });
  }
}
