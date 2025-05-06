import { Component, OnInit } from '@angular/core';
import { Family } from '../../../models/Family';
import { FamilyService } from '../../../services/family.service';
import { UserService } from '../../../services/user.service';
import { Reward } from '../../../models/Reward';
import { Task } from '../../../models/Task';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-configure-summary',
  imports: [ButtonModule],
  templateUrl: './configure-summary.component.html',
  styleUrl: './configure-summary.component.less'
})
export class ConfigureSummaryComponent implements OnInit {
  family: Family;
  tasks: Task[] = [];
  rewards: Reward[] = [];
  
  constructor(
    private userService: UserService,
    private familyService: FamilyService,
    private router: Router
  ) {
    this.family = this.userService.family!;
  }

  async ngOnInit(): Promise<void> {
    this.tasks = await this.familyService.getFamilyTasks(this.family);
    if(this.family.settings.rewards) this.rewards = await this.familyService.getFamilyRewards(this.family);
  }

  async finalizeConfiguration() {
    const family = this.userService.family;
    if (family) {
      family.configStep = 6;
      await this.familyService.updateFamily(family);
      this.router.navigateByUrl('home');
    }
  }
}
