import { Component, Input } from '@angular/core';
import { TaskList } from '../../../../../models/TaskList';

@Component({
  selector: 'app-my-tasks-calendar',
  imports: [],
  templateUrl: './my-tasks-calendar.component.html',
  styleUrl: './my-tasks-calendar.component.less'
})
export class MyTasksCalendarComponent {
  @Input('tasks') tasks: TaskList[] = [];
}
