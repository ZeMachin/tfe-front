import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reward } from '../../../models/Reward';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FamilyService } from '../../../services/family.service';
import { UserService } from '../../../services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Metric } from '../../../models/Metric';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import * as _ from 'lodash';

@Component({
  selector: 'app-reward',
  imports: [ButtonModule, SliderModule, InputTextModule, FormsModule, InputNumberModule, SelectModule, ConfirmDialogModule, ToggleSwitchModule],
  providers: [ConfirmationService],
  templateUrl: './reward.component.html',
  styleUrl: './reward.component.less'
})
export class RewardComponent implements OnInit {
  @Input('reward') reward!: Reward;
  @Output('onDelete') onDelete: EventEmitter<boolean> = new EventEmitter();

  isStockLimited: boolean = false;
  editingName: boolean = false;
  sending: boolean = false;
  hasChanged: boolean = false;

  constructor(
    private familyService: FamilyService,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.isStockLimited = !!this.reward.currentStock;
  }

  onPropertyChange($event?: any) {
    console.log('property changed!')
    this.hasChanged = true;
  }

  toggleEditingName() {
    this.editingName = !this.editingName;
  }

  onToggleStock() {
    this.reward.currentStock = this.isStockLimited ? 0 : undefined;
    this.hasChanged = true;
  }

  async save() {
    this.sending = true;
    if (this.userService.family) {
      try {
        const reward = this.reward.new ? await this.familyService.createFamilyReward(this.userService.family, this.reward) : await this.familyService.updateFamilyReward(this.userService.family, this.reward);
        this.messageService.add({
          severity: 'success',
          summary: this.reward.new ? 'Created' : 'Updated',
          detail: this.reward.new ? 'The new reward has been created successfully!' : 'The reward has been updated successfully!'
        });
        this.reward.new = false;
        this.hasChanged = false;
      } catch (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Something went wrong, the reward has not been created. Please try again.'
        });
      } finally {
        this.sending = false;
      }
    }
  }

  async openDeleteConfirmDialog() {
    this.confirmationService.confirm({
      header: 'Confirm deletion',
      message: `Are you sure you want to delete '${this.reward.name}'?`,
      accept: async () => this.delete()
    });
  }

  async delete() {
    if (this.userService.family) {
      try {
        await this.familyService.deleteFamilyReward(this.userService.family, this.reward);
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'The reward has been deleted successfully!'
        });
        this.onDelete.emit(false);
      } catch (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Something went wrong, the reward has not been deleted. Please try again.'
        });
      } finally {
        // this.onDelete.emit(false);
      }
    }
  }

  deleteNewReward() {
    this.onDelete.emit(true);
  }
}
