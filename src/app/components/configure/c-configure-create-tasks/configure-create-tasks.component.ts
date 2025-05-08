import { Component, EventEmitter, Output } from '@angular/core';
import { FamilyService } from '../../../services/family.service';
import { Task } from '../../../models/Task';
import { UserService } from '../../../services/user.service';
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

  tasks: Task[] = [];

  constructor(
    private userService: UserService,
    private familyService: FamilyService
  ) { }

  async onNextStep() {
    const family = this.userService.family;
    if (family) {
      family.configStep = 3;
      await this.familyService.updateFamily(family);
      this.nextStep.emit();
    }
  }
}
