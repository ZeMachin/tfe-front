import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ConfigureFirstMemberComponent } from "./a-configure-first-member/configure-first-member.component";
import { ConfigureHouseholdTypeComponent } from "./b-configure-household-type/configure-household-type.component";
import { ConfigureCreateTasksComponent } from "./c-configure-create-tasks/configure-create-tasks.component";
import { ConfigureLeaderboardComponent } from "./d-configure-leaderboard/configure-leaderboard.component";
import { ConfigureRewardsComponent } from "./e-configure-rewards/configure-rewards.component";
import { ConfigureSummaryComponent } from "./f-configure-summary/configure-summary.component";

@Component({
  selector: 'app-configure',
  imports: [ConfigureFirstMemberComponent, ConfigureHouseholdTypeComponent, ConfigureCreateTasksComponent, ConfigureLeaderboardComponent, ConfigureRewardsComponent, ConfigureSummaryComponent],
  templateUrl: './configure.component.html',
  styleUrl: './configure.component.less'
})
export class ConfigureComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.checkStep();
  }

  checkStep(): void {
    this.currentStep = this.userService.family?.configStep;
  }

  currentStep?: number;
}
