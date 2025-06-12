import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { TaskList } from '../../models/TaskList';
import { UserSelectionComponent } from "../users/user-selection/user-selection.component";
import { AssignedTaskComponent } from "../chores/tasks/assign-tasks/assigned-task/assigned-task.component";
import { AssignedTask } from '../../models/AssignedTask';

@Component({
  selector: 'app-home',
  imports: [UserSelectionComponent, AssignedTaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  assignedTasks: AssignedTask[] = [];

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  async ngOnInit(): Promise<void> {
    if (!this.userService.family) {
      this.messageService.add({
        severity: 'error',
        summary: 'Oops',
        detail: "Something went wrong with the authentication: your family wasn't retrieved properly. \nPlease try again."
      });
      this.authService.logout();
    }
    await this.getAssignedTasks();
  }

  async getAssignedTasks() {
    if (this.userService.member) {
      const taskLists: TaskList[] = await this.userService.getTaskLists();
      this.assignedTasks = taskLists.map((tl) => tl.assignedTasks).reduce((a, b) => a.concat(b), []);
    }
  }

  async userSelected($event: any) {
    await this.userService.selectUser($event);
    await this.getAssignedTasks();
  }
}
