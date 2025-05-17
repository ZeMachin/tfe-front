import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { Task } from '../../../../models/Task';
import { FamilyService } from '../../../../services/family.service';
import { UserService } from '../../../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-edit-tasks',
  imports: [TaskComponent, ButtonModule],
  templateUrl: './edit-tasks.component.html',
  styleUrl: './edit-tasks.component.less'
})
export class EditTasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private userService: UserService,
    private familyService: FamilyService
  ) { }


  async ngOnInit(): Promise<void> {
    this.refreshTasks();
  }

  async refreshTasks() {
    this.tasks = await this.familyService.getFamilyTasks();
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
