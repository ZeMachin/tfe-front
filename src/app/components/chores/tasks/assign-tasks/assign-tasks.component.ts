import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../../../../services/family.service';
import { UserService } from '../../../../services/user.service';
import { FamilyMember } from '../../../../models/FamilyMember';
import { Task } from '../../../../models/Task';
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-assign-tasks',
  imports: [TableModule, ButtonModule],
  templateUrl: './assign-tasks.component.html',
  styleUrl: './assign-tasks.component.less'
})
export class AssignTasksComponent implements OnInit {
  members: FamilyMember[] = [];
  tasks: Task[] = [];

  expandedRows: { [key: number]: boolean } = {};

  constructor(
    private familyService: FamilyService,
    private userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loadTasks();
    this.loadMembers();
  }

  async loadTasks() {
    if (this.userService.family)
      this.tasks = await this.familyService.getFamilyTasks(this.userService.family);
  }

  async loadMembers() {
    if (this.userService.family)
      this.members = await this.familyService.getFamilyMembers(this.userService.family.id);
  }

  expandAll() {
    const initialValue: { [key: number]: boolean } = {};
    this.expandedRows = this.members.reduce((acc, m) => (acc[m.id] = true) && acc, initialValue);
  }

  collapseAll() {
    this.expandedRows = {};
  }

  onRowExpand(event: TableRowExpandEvent) {
    // this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    // this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
  }
}
