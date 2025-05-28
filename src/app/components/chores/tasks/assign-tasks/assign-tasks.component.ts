import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../../../../services/family.service';
import { FamilyMember } from '../../../../models/FamilyMember';
import { Task } from '../../../../models/Task';
import { TabsModule } from 'primeng/tabs';
import { AssignTasksCalendarComponent } from './assign-tasks-calendar/assign-tasks-calendar.component';
import { AssignTasksTableComponent } from './assign-tasks-table/assign-tasks-table.component';

@Component({
  selector: 'app-assign-tasks',
  imports: [TabsModule, AssignTasksCalendarComponent, AssignTasksTableComponent],
  templateUrl: './assign-tasks.component.html',
  styleUrl: './assign-tasks.component.less'
})
export class AssignTasksComponent implements OnInit {
  members: FamilyMember[] = [];
  tasks: Task[] = [];

  constructor(
    private familyService: FamilyService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async refresh() {
    await this.loadTasks();
    await this.loadMembers();
  }

  async loadTasks() {
      this.tasks = await this.familyService.getFamilyTasks();
  }

  async loadMembers() {
      this.members = await this.familyService.getFamilyMembers();
  }
}
