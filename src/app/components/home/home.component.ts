import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { TaskList } from '../../models/TaskList';
import { FamilyMember } from '../../models/FamilyMember';
import { UserSelectionComponent } from "../user-selection/user-selection.component";
import { AssignedTaskComponent } from "../chores/tasks/assigned-task/assigned-task.component";
import { FamilyService } from '../../services/family.service';

@Component({
  selector: 'app-home',
  imports: [UserSelectionComponent, AssignedTaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  assignedTasks: TaskList[] = [];
  user?: FamilyMember;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService
  ) { 
    this.user = this.userService.member;
  }

  async ngOnInit(): Promise<void> {
    if(!this.userService.family) {
      this.messageService.add({
        severity: 'error',
        summary: 'Oops',
        detail: "Something went wrong with the authentication: your family wasn't retrieved properly. \nPlease try again."
      });
      this.authService.logout();
    }       
    if(this.user) {
      this.assignedTasks = await this.userService.getAssignedTasks();
    }
  }

  onUserSelected() {
    this.user = this.userService.member;
  }
}
