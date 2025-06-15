import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ConfigureFirstMemberComponent } from "./a-configure-first-member/configure-first-member.component";
import { ConfigureHouseholdTypeComponent } from "./b-configure-household-type/configure-household-type.component";
import { ConfigureCreateTasksComponent } from "./c-configure-create-tasks/configure-create-tasks.component";
import { ConfigureLeaderboardComponent } from "./d-configure-leaderboard/configure-leaderboard.component";
import { ConfigureRewardsComponent } from "./e-configure-rewards/configure-rewards.component";
import { ConfigureSummaryComponent } from "./f-configure-summary/configure-summary.component";
import { FamilyService } from '../../services/family.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-configure',
  imports: [ConfigureFirstMemberComponent, ConfigureHouseholdTypeComponent, ConfigureCreateTasksComponent, ConfigureLeaderboardComponent, ConfigureRewardsComponent, ConfigureSummaryComponent],
  templateUrl: './configure.component.html',
  styleUrl: './configure.component.less'
})
export class ConfigureComponent implements OnInit {
  currentStep?: number;

  constructor(
    private userService: UserService,
    private familyService: FamilyService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.checkStep();
  }

  checkStep(): void {
    this.currentStep = this.userService.family?.configStep;
  }

  async changeStep(step: number): Promise<void> {
    if (this.userService.family) {
      const currentStep: number = this.userService.family.configStep;
      this.userService.family.configStep = step;
      try {
        await this.familyService.updateFamily();
      } catch (err: any) {
        console.error(err);
        const detail = err.error?.message
          ? `The following error occured: ${err.error?.message}`
          : 'Something went wrong. Please try again.';
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail,
        });
        this.userService.family.configStep = currentStep;
      }
      if (step === 6) this.router.navigateByUrl('home');
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Failure',
        detail: 'Error: no family logged in.',
      });
    }
    this.checkStep();
  }
}
