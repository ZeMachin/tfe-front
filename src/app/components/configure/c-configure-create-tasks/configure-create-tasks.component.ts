import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../../../services/family.service';
import { Task } from '../../../models/Task';
import { UserService } from '../../../services/user.service';
import { TaskComponent } from "../../chores/task/task.component";

@Component({
  selector: 'app-configure-create-tasks',
  imports: [TaskComponent],
  templateUrl: './configure-create-tasks.component.html',
  styleUrl: './configure-create-tasks.component.less'
})
export class ConfigureCreateTasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    private userService: UserService,
    private familyService: FamilyService
  ) {}

  async ngOnInit(): Promise<void> {
    if(this.userService.family)
      this.tasks = await this.familyService.getFamilyTasks(this.userService.family);
  }
}
