import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../../../models/Task';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FamilyService } from '../../../../services/family.service';
import { UserService } from '../../../../services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Metric } from '../../../../models/Metric';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import * as _ from 'lodash';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-task',
  imports: [ButtonModule, SliderModule, InputTextModule, FormsModule, InputNumberModule, SelectModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './task.component.html',
  styleUrl: './task.component.less'
})
export class TaskComponent implements OnInit {
  @Input('task') task!: Task;
  @Output('onDelete') onDelete: EventEmitter<boolean> = new EventEmitter();

  metrics: Metric[] = [];
  unusedMetrics: Metric[] = [];
  selectedMetric?: Metric;

  editingName: boolean = false;
  sending: boolean = false;
  hasChanged: boolean = false;

  constructor(
    private familyService: FamilyService,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.userService.family) {
      this.metrics = await this.familyService.getFamilyMetrics(this.userService.family);
      this.refreshUnusedMetrics();
    }
  }

  onNameChange() {
    this.hasChanged = true;
  }
 
  toggleEditingName() {
    this.editingName = !this.editingName;
  }

  addMetric() {
    if (this.selectedMetric) {
      _.remove(this.unusedMetrics, this.selectedMetric);
      this.selectedMetric.weight = 1;
      this.task.metrics.push(this.selectedMetric);
      this.selectedMetric = undefined;
      this.hasChanged = true;
    }
  }

  removeMetric(metric: Metric) {
    this.hasChanged = true;
    _.remove(this.task.metrics, metric);
    this.refreshUnusedMetrics();
  }

  refreshUnusedMetrics() {
    this.unusedMetrics = this.metrics.filter((m) => !this.task.metrics.map((me) => me.id).includes(m.id));
  }

  async save() {
    this.sending = true;
    if (this.userService.family) {
      try {
        const task = this.task.new ? await this.familyService.createFamilyTask(this.userService.family, this.task) : await this.familyService.updateFamilyTask(this.userService.family, this.task);
        this.messageService.add({
          severity: 'success',
          summary: this.task.new ? 'Created' : 'Updated',
          detail: this.task.new ? 'The new task has been created successfully!' : 'The task has been updated successfully!'
        });
        this.task.new = false;
        this.hasChanged = false;
      } catch (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Something went wrong, the task has not been created. Please try again.'
        });
      } finally {
        this.sending = false;
      }
    }
  }

  async openDeleteConfirmDialog() {
    this.confirmationService.confirm({
      header: 'Confirm deletion',
      message: `Are you sure you want to delete '${this.task.name}'?`,
      accept: async () => this.delete()
    });
  }

  async delete() {
    if (this.userService.family) {
      try {
        await this.familyService.deleteFamilyTask(this.userService.family, this.task);
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'The task has been deleted successfully!'
        });
        this.onDelete.emit(false);
      } catch (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Something went wrong, the task has not been deleted. Please try again.'
        });
      } finally {
        // this.onDelete.emit(false);
      }
    }
  }

  deleteNewTask() {
    this.onDelete.emit(true);
  }
}
