import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Family } from '../../models/Family';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UserSelectionVignetteComponent } from "./user-selection-vignette/user-selection-vignette.component";
import { FamilyMember } from '../../models/FamilyMember';

@Component({
  selector: 'app-user-selection',
  imports: [UserSelectionVignetteComponent],
  templateUrl: './user-selection.component.html',
  styleUrl: './user-selection.component.less'
})
export class UserSelectionComponent {
  @Output('onUserSelection') userSelection: EventEmitter<any> = new EventEmitter();
  family: Family;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.family = this.userService.family!;
  }

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

  async userSelect(member: FamilyMember) {
    this.userSelection.emit(member);
  }
}
