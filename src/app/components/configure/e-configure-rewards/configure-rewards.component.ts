import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import _ from 'lodash';
import { Reward } from '../../../models/Reward';
import { FamilyService } from '../../../services/family.service';
import { UserService } from '../../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { RewardComponent } from '../../chores/rewards/reward/reward.component';

@Component({
  selector: 'app-configure-rewards',
  imports: [ButtonModule, RewardComponent],
  templateUrl: './configure-rewards.component.html',
  styleUrl: './configure-rewards.component.less'
})
export class ConfigureRewardsComponent implements OnInit {
  @Output('nextStep') nextStep: EventEmitter<any> = new EventEmitter();

  rewards: Reward[] = [];

  constructor(
    private userService: UserService,
    private familyService: FamilyService
  ) { }

  async ngOnInit(): Promise<void> {
    this.refreshRewards();
  }

  async refreshRewards() {
    if (this.userService.family)
      this.rewards = await this.familyService.getFamilyRewards(this.userService.family);
  }

  addReward() {
    this.rewards.push(new Reward({ name: this.getDefaultRewardName(), value: 1, id: -1, new: true }));
  }

  getDefaultRewardName(): string {
    let name = 'My new reward';
    let i = 1;
    while (this.rewards.map((t) => t.name).includes(name)) {
      name = `My new reward ${i++}`;
    }
    return name;
  }

  onDeleteReward($event: boolean, reward: Reward) {
    _.remove(this.rewards, reward);
  }

  async onNextStep() {
    const family = this.userService.family;
    if (family) {
      family.configStep = 5;
      await this.familyService.updateFamily(family);
      this.nextStep.emit();
    }
  }
}