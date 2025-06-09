import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../../models/Task';
import { ButtonModule } from 'primeng/button';
import _ from 'lodash';
import { EditTasksComponent } from "../../chores/tasks/edit-tasks/edit-tasks.component";

@Component({
  selector: 'app-configure-create-tasks',
  imports: [ButtonModule, EditTasksComponent],
  templateUrl: './configure-create-tasks.component.html',
  styleUrl: './configure-create-tasks.component.less'
})
export class ConfigureCreateTasksComponent {
  @Output('nextStep') nextStep: EventEmitter<any> = new EventEmitter();
  @Output('previousStep') previousStep: EventEmitter<any> = new EventEmitter();

  tasks: Task[] = [];

  async onNextStep() {
      this.nextStep.emit();
  }

  onPreviousStep() {
    this.previousStep.emit();
  }
}
