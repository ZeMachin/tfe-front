import { Component, Input } from '@angular/core';
import { TaskList } from '../../../../models/TaskList';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-assigned-task',
  imports: [ButtonModule],
  templateUrl: './assigned-task.component.html',
  styleUrl: './assigned-task.component.less'
})
export class AssignedTaskComponent {
  @Input('task') taskList!: TaskList;

  submit() {
    console.log('submit task completion')
  }
}
