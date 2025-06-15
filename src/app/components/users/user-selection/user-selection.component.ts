import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { UserSelectionVignetteComponent } from "./user-selection-vignette/user-selection-vignette.component";
import { FamilyMember } from '../../../models/FamilyMember';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-selection',
  imports: [UserSelectionVignetteComponent, ButtonModule],
  templateUrl: './user-selection.component.html',
  styleUrl: './user-selection.component.less'
})
export class UserSelectionComponent {
  @Input('edit') edit: boolean = false;
  @Input('allowEditToggle') allowEditToggle: boolean = true;

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    if (!this.userService.family) {
      this.messageService.add({
        severity: 'error',
        summary: 'Oops',
        detail: "Something went wrong with the authentication: your family wasn't retrieved properly. \nPlease try again."
      });
      this.authService.logout();
    }
  }

  async onUserSelect(member?: FamilyMember) {
    if (this.edit) this.router.navigateByUrl('users/user_profile', { state: { member } });
    else if (member) {
      if(this.userService.member?.id === member.id) {
        await this.userService.selectUser(member);
      }
      this.router.navigateByUrl('home');
    }
  }

  toggleEdit() {
    if (this.allowEditToggle) this.edit = !this.edit;
  }
}
