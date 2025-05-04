import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../../../services/family.service';
import { Task } from '../../../models/Task';
import { UserService } from '../../../services/user.service';
import { TaskComponent } from "../../chores/task/task.component";
import { ButtonModule } from 'primeng/button';
import _ from 'lodash';

@Component({
  selector: 'app-configure-create-tasks',
  imports: [TaskComponent, ButtonModule],
  templateUrl: './configure-create-tasks.component.html',
  styleUrl: './configure-create-tasks.component.less'
})
export class ConfigureCreateTasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    private userService: UserService,
    private familyService: FamilyService
  ) { }

  async ngOnInit(): Promise<void> {
    this.refreshTasks();
  }

  async refreshTasks() {
    if (this.userService.family)
      this.tasks = await this.familyService.getFamilyTasks(this.userService.family);
  }

  addTask() {
    this.tasks.push(new Task({ name: this.getDefaultTaskName(), id: -1, metrics: [], new: true }));
  }

  getDefaultTaskName(): string {
    let name = 'My new task';
    let i = 1;
    while (this.tasks.map((t) => t.name).includes(name)) {
      name = `My new task ${i++}`;
    }
    return name;
  }

  onDeleteTask($event: boolean, task: Task) {
    // if ($event) {
      _.remove(this.tasks, task);
    // } else {
    //   this.refreshTasks();
    // }
  }
}
