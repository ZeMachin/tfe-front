import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../../../../services/family.service';
import { Reward } from '../../../../models/Reward';
import { RewardBuyComponent } from './reward-buy/reward-buy.component';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-rewards-shop',
  imports: [RewardBuyComponent],
  templateUrl: './rewards-shop.component.html',
  styleUrl: './rewards-shop.component.less'
})
export class RewardsShopComponent implements OnInit {
  rewards: Reward[] = [];

  constructor(
    private familyService: FamilyService,
    public userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    this.refreshRewards();
  }

  async refreshRewards() {
      this.rewards = await this.familyService.getFamilyRewards();
  }

  async onBuyReward($event: any, reward: Reward) {
    await this.familyService.buyReward(reward);
    this.refreshRewards();
  }
}
