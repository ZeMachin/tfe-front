import { Component, OnInit } from '@angular/core';
import { TaskList } from '../../../../models/TaskList';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { TabsModule } from 'primeng/tabs';
import { MyTasksTableComponent } from "./my-tasks-table/my-tasks-table.component";
import { MyTasksCalendarComponent } from "./my-tasks-calendar/my-tasks-calendar.component";
import { FamilyService } from '../../../../services/family.service';
import { CompletionStatus } from '../../../../models/CompletionStatuts';
import { AssignedTask } from '../../../../models/AssignedTask';

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
      this.assignedTasks = await this.userService.getTaskLists();
      this.pendingTasks = this.assignedTasks.filter((at) => !at.completedAt)
      this.lateTasks = this.pendingTasks.filter((pt) => pt.status === CompletionStatus.late);
    }
  }

  async completeTask({ value: assignedTask, next }: { value: AssignedTask, next: (value?: unknown) => void }): Promise<void> {
    console.log('completeTask()')
    console.log('assigned task:', assignedTask)
    try {
      await this.familyService.completeTask(assignedTask);
      this.messageService.add({
        severity: 'success',
        summary: 'Completed',
        detail: 'The task has been completed successfully!'
      });
      await this.refreshTaskList();
      next();
    } catch (err) {
      console.error(err);
      this.messageService.add({
        severity: 'error',
        summary: 'Failure',
        detail: 'Something went wrong, the task has not been completed succesfully. Please try again.'
      });
      next();
    }
  }
}

