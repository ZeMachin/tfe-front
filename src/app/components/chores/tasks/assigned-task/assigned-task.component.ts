import { Component, Input } from '@angular/core';
import { TaskList } from '../../../../models/TaskList';

@Component({
  selector: 'app-assigned-task',
  imports: [],
  templateUrl: './assigned-task.component.html',
  styleUrl: './assigned-task.component.less'
})
export class AssignedTaskComponent {
  @Input('task') task!: TaskList;
}
