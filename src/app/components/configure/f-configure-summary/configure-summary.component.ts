import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Family } from '../../../models/Family';
import { FamilyService } from '../../../services/family.service';
import { UserService } from '../../../services/user.service';
import { Reward } from '../../../models/Reward';
import { Task } from '../../../models/Task';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-configure-summary',
  imports: [ButtonModule],
  templateUrl: './configure-summary.component.html',
  styleUrl: './configure-summary.component.less'
})
export class ConfigureSummaryComponent implements OnInit {
  @Output('nextStep') nextStep: EventEmitter<any> = new EventEmitter();
  @Output('previousStep') previousStep: EventEmitter<any> = new EventEmitter();
  family?: Family;
  tasks: Task[] = [];
  rewards: Reward[] = [];

  constructor(
    private userService: UserService,
    private familyService: FamilyService,
  ) {
    this.family = this.userService.family;
  }

  async ngOnInit(): Promise<void> {
    this.tasks = await this.familyService.getFamilyTasks();
    if (this.family?.settings.rewards) this.rewards = await this.familyService.getFamilyRewards();
  }

  async finalizeConfiguration() {
    this.nextStep.emit();
  }

  onPreviousStep() {
    this.previousStep.emit();
  }
}
