import { Component, Input } from '@angular/core';
import { Task } from '../../../models/Task';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FamilyService } from '../../../services/family.service';
import { UserService } from '../../../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task',
  imports: [ButtonModule, SliderModule, InputTextModule, FormsModule, InputNumberModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.less'
})
export class TaskComponent {
  @Input('task') task!: Task;
  @Input('new') new?: boolean = false;

  editingName: boolean = false;
  sending: boolean = false;

  constructor(
    private familyService: FamilyService,
    private userService: UserService,
    private messageService: MessageService,
  ) { }

  toggleEditingName() {
    this.editingName = !this.editingName;
  }

  async save() {
    this.sending = true;
    if (this.userService.family) {
      try {
        const task = this.new ? await this.familyService.createFamilyTask(this.userService.family, this.task) : await this.familyService.updateFamilyTask(this.userService.family, this.task);
        this.messageService.add({
          severity: 'success',
          summary: this.new ? 'Created' : 'Updated',
          detail: this.new ? 'The new task has been created successfully!' : 'The task has been updated successfully!'
        });
      } catch (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Something went wrong, the task has not been created. Please try again.'
        });
      } finally {
        this.sending = false;
      }
    }
  }
}
