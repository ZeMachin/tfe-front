import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DynamicDialogRef, DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableRowExpandEvent, TableRowCollapseEvent, TableModule } from 'primeng/table';
import { FamilyMember } from '../../../../../models/FamilyMember';
import { Task } from '../../../../../models/Task';
import { AssignTaskModalComponent } from '../assign-task-modal/assign-task-modal.component';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { TaskList } from '../../../../../models/TaskList';

@Component({
  selector: 'app-assign-tasks-table',
  imports: [TableModule, ButtonModule, DynamicDialogModule, DatePipe],
  templateUrl: './assign-tasks-table.component.html',
  styleUrl: './assign-tasks-table.component.less'
})
export class AssignTasksTableComponent implements OnDestroy, OnInit {
  @Input('members') members: FamilyMember[] = [];
  @Input('tasks') tasks: Task[] = [];
  @Output('refresh') refresh: EventEmitter<any> = new EventEmitter();

  ref: DynamicDialogRef | undefined;

  expandedRows: { [key: number]: boolean } = {};

  constructor(
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.refresh.emit();
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
        header: `Assign task`,
        modal: true,
        closable: true,
        data: {
          taskList: {
            member
          },
          new: true
        }
      })

    this.ref.onClose.subscribe((x) => {
      this.refresh.emit();
    })
  }

  editTask(member: FamilyMember, taskList: TaskList) {
    this.ref = this.dialogService.open(
      AssignTaskModalComponent,
      {
        header: `Edit task`,
        modal: true,
        closable: true,
        data: {
          taskList: {
            ...taskList,
            member
          },
          new: false
        }
      })

    this.ref.onClose.subscribe((x) => {
      this.refresh.emit();
    })
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
