import { Component, OnInit } from '@angular/core';
import { FamilyMember } from '../../../../models/FamilyMember';
import { TaskList } from '../../../../models/TaskList';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { AssignedTaskComponent } from "../assigned-task/assigned-task.component";

@Component({
  selector: 'app-my-tasks',
  imports: [AssignedTaskComponent],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.less'
})
export class MyTasksComponent implements OnInit  {
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
    // TODO: handle that with guard
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
}
