import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { Reward } from '../../../../models/Reward';
import { FamilyService } from '../../../../services/family.service';
import { ButtonModule } from 'primeng/button';
import { RewardComponent } from '../reward/reward.component';

@Component({
  selector: 'app-edit-rewards',
  imports: [
    ButtonModule,
    RewardComponent
  ],
  templateUrl: './edit-rewards.component.html',
  styleUrl: './edit-rewards.component.less'
})
export class EditRewardsComponent implements OnInit {
  rewards: Reward[] = [];

  constructor(
    private familyService: FamilyService
  ) { }

  async ngOnInit(): Promise<void> {
    this.refreshRewards();
  }

  async refreshRewards() {
    this.rewards = await this.familyService.getFamilyRewards();
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
}
