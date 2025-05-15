import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../../../../services/family.service';
import { UserService } from '../../../../services/user.service';
import { Reward } from '../../../../models/Reward';
import { FamilyMember } from '../../../../models/FamilyMember';
import { RewardBuyComponent } from './reward-buy/reward-buy.component';

@Component({
  selector: 'app-rewards-shop',
  imports: [RewardBuyComponent],
  providers: [],
  templateUrl: './rewards-shop.component.html',
  styleUrl: './rewards-shop.component.less'
})
export class RewardsShopComponent implements OnInit {
  rewards: Reward[] = [];
  member?: FamilyMember;

  constructor(
    private userService: UserService,
    private familyService: FamilyService
  ) { }

  async ngOnInit(): Promise<void> {
    this.refreshMember();
    this.refreshRewards();
  }

  async refreshMember() {
    await this.userService.refreshMember();
    this.member = this.userService.member;
  }

  async refreshRewards() {
    if (this.userService.family)
      this.rewards = await this.familyService.getFamilyRewards(this.userService.family);
  }

  async onBuyReward($event: any, reward: Reward) {
    if(this.member) await this.familyService.buyReward(this.member, reward);
    this.refreshMember();
    this.refreshRewards();
  }
}
