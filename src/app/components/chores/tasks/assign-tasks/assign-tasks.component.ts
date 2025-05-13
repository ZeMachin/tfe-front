import { Component, OnDestroy, OnInit } from '@angular/core';
import { FamilyService } from '../../../../services/family.service';
import { UserService } from '../../../../services/user.service';
import { FamilyMember } from '../../../../models/FamilyMember';
import { Task } from '../../../../models/Task';
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AssignTaskModalComponent } from './assign-task-modal/assign-task-modal.component';

@Component({
  selector: 'app-assign-tasks',
  imports: [TableModule, ButtonModule, DynamicDialogModule],
  providers: [DialogService],
  templateUrl: './assign-tasks.component.html',
  styleUrl: './assign-tasks.component.less'
})
export class AssignTasksComponent implements OnInit, OnDestroy {
  ref: DynamicDialogRef | undefined;

  members: FamilyMember[] = [];
  tasks: Task[] = [];

  expandedRows: { [key: number]: boolean } = {};

  constructor(
    private familyService: FamilyService,
    private userService: UserService,
    private dialogService: DialogService
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

  openTaskAssignmentModal(member: FamilyMember) {
    this.ref = this.dialogService.open(
      AssignTaskModalComponent,
      {
        header: `Assign task to ${member.name}`,
        modal: true,
        closable: true,
        data: {
          member
        }
      })

      this.ref.onClose.subscribe((x) => {
        this.loadTasks();
        this.loadMembers();
      })
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
