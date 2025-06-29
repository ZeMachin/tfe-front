import { Component, Input } from '@angular/core';
import { TaskList } from '../../../../../models/TaskList';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { FamilyService } from '../../../../../services/family.service';
import { AssignedTask } from '../../../../../models/AssignedTask';

@Component({
  selector: 'app-assigned-task',
  imports: [ButtonModule, CommonModule],
  templateUrl: './assigned-task.component.html',
  styleUrl: './assigned-task.component.less'
})
export class AssignedTaskComponent {
  @Input('task') assignedTask!: AssignedTask;
  sending: boolean = false;

  constructor(
    private messageService: MessageService,
    private familyService: FamilyService
  ) { }

  async submit() {
    this.sending = true;
    try {
      await this.familyService.completeTask(this.assignedTask);
      this.messageService.add({
        severity: 'success',
        summary: 'Completed',
        detail: 'The task has been completed successfully!'
      });
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
