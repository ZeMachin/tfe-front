import { Component, OnInit } from '@angular/core';
import { FamilyMember } from '../../../../models/FamilyMember';
import { TaskList } from '../../../../models/TaskList';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { TabsModule } from 'primeng/tabs';
import { MyTasksTableComponent } from "./my-tasks-table/my-tasks-table.component";
import { MyTasksCalendarComponent } from "./my-tasks-calendar/my-tasks-calendar.component";
import { FamilyService } from '../../../../services/family.service';

@Component({
  selector: 'app-my-tasks',
  imports: [TabsModule, MyTasksTableComponent, MyTasksCalendarComponent],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.less'
})
export class MyTasksComponent implements OnInit {
  assignedTasks: TaskList[] = [];
  pendingTasks: TaskList[] = [];
  lateTasks: TaskList[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private familyService: FamilyService
  ) { }

  async ngOnInit(): Promise<void> {
    // TODO: handle that with guard
    if (!this.userService.family) {
      this.messageService.add({
        severity: 'error',
        summary: 'Oops',
        detail: "Something went wrong with the authentication: your family wasn't retrieved properly. \nPlease try again."
      });
      this.authService.logout();
    }
    await this.refreshTaskList();
  }

  async refreshTaskList() {
    if (this.userService.member) {
      this.assignedTasks = await this.userService.getAssignedTasks();
      this.pendingTasks = this.assignedTasks.filter((at) => !at.completedAt)
      this.lateTasks = this.pendingTasks.filter((pt) => pt.taskEnd ? pt.taskEnd.getTime() < Date.now() : false);
    }
  }

  async completeTask(taskList: TaskList) {
    try {
      await this.familyService.completeTask(taskList);
      this.messageService.add({
        severity: 'success',
        summary: 'Completed',
        detail: 'The task has been completed successfully!'
      });
      await this.refreshTaskList();
    } catch (err) {
      this.messageService.add({
        severity: 'error',
        summary: 'Failure',
        detail: 'Something went wrong, the reward has not been created. Please try again.'
      });
    } 
  }
}
