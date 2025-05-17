import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Metric } from '../../../../models/Metric';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FamilyService } from '../../../../services/family.service';
import { UserService } from '../../../../services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-metric',
  imports: [ButtonModule, SliderModule, InputTextModule, FormsModule, InputNumberModule, SelectModule, ConfirmDialogModule],
  templateUrl: './metric.component.html',
  styleUrl: './metric.component.less'
})
export class MetricComponent {
  @Input('metric') metric!: Metric;
  @Output('onDelete') onDelete: EventEmitter<boolean> = new EventEmitter();

  editingName: boolean = false;
  sending: boolean = false;
  hasChanged: boolean = false;

  constructor(
    private familyService: FamilyService,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  onChange() {
    this.hasChanged = true;
  }

  toggleEditingName() {
    this.editingName = !this.editingName;
  }

  async save() {
    this.sending = true;
    try {
      this.metric = this.metric.new ? await this.familyService.createFamilyMetric(this.metric) : await this.familyService.updateFamilyMetric(this.metric);
      this.messageService.add({
        severity: 'success',
        summary: this.metric.new ? 'Created' : 'Updated',
        detail: this.metric.new ? 'The new metric has been created successfully!' : 'The metric has been updated successfully!'
      });
      this.metric.new = false;
      this.hasChanged = false;
    } catch (err) {
      this.messageService.add({
        severity: 'error',
        summary: 'Failure',
        detail: 'Something went wrong, the metric has not been created. Please try again.'
      });
    } finally {
      this.sending = false;
    }
  }

  async openDeleteConfirmDialog() {
    this.confirmationService.confirm({
      header: 'Confirm deletion',
      message: `Are you sure you want to delete '${this.metric.name}'?`,
      accept: async () => this.delete()
    });
  }

  async delete() {
    try {
      await this.familyService.deleteFamilyMetric(this.metric);
      this.messageService.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'The metric has been deleted successfully!'
      });
      this.onDelete.emit(false);
    } catch (err) {
      this.messageService.add({
        severity: 'error',
        summary: 'Failure',
        detail: 'Something went wrong, the metric has not been deleted. Please try again.'
      });
    } finally {
      // this.onDelete.emit(false);
    }
  }

  deleteNewMetric() {
    this.onDelete.emit(true);
  }
}
