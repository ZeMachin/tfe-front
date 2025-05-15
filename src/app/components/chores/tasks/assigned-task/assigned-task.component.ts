import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from '../../../../models/TaskList';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { MessageService } from 'primeng/api';
import { FamilyService } from '../../../../services/family.service';

@Component({
  selector: 'app-assigned-task',
  imports: [ButtonModule, CommonModule],
  providers: [UserService, MessageService, FamilyService],
  templateUrl: './assigned-task.component.html',
  styleUrl: './assigned-task.component.less'
})
export class AssignedTaskComponent implements OnInit {
  @Input('task') taskList!: TaskList;
  currentClasses: Record<string, boolean> = {};
  sending: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private familyService: FamilyService
  ) { }

  async submit() {
    this.sending = true;
    if (this.userService.member) {
      try {
        this.taskList = await this.familyService.completeTask(this.taskList, this.userService.member);
        this.messageService.add({
          severity: 'success',
          summary: 'Completed',
          detail: 'The task has been completed successfully!'
        });
        this.setCurrentClasses();
      } catch (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Something went wrong, the reward has not been created. Please try again.'
        });
      } finally {
        this.sending = false;
      }
    }
  }

  ngOnInit(): void {
    this.setCurrentClasses();
  }

  setCurrentClasses() {
    // CSS classes: added/removed per current state of component properties
    this.currentClasses = {
      completed: !!this.taskList.completedAt,
      late: this.taskList.taskEnd ? this.taskList.taskEnd.getTime() < Date.now() : false,
    };
  }
}
