import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../../../../../models/TaskList';
import { TableModule } from 'primeng/table';
import { UserService } from '../../../../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { ThenableEventEmitter } from '../../../../../utils/thenable-event';

@Component({
  selector: 'app-my-tasks-table',
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './my-tasks-table.component.html',
  styleUrl: './my-tasks-table.component.less'
})
export class MyTasksTableComponent {
  @Input('tasks') tasks: TaskList[] = [];
  @Output('onCompleteTask') onCompleteTask: ThenableEventEmitter<TaskList> = new ThenableEventEmitter();

  sendings: { [key: number]: boolean } = {};

  constructor(
    private userService: UserService
  ) {}

  get usesPoints() { return this.userService.family?.settings?.rewards || this.userService.family?.settings?.leaderboard}

  async completeTask(taskList: TaskList) {
    if(taskList.id) {
      this.sendings[taskList.id] = true;
      await this.onCompleteTask.emit(taskList)
      .then(() => this.sendings[taskList.id!] = false)
      .catch((err) => this.sendings[taskList.id!] = false);
    }
  }
}
