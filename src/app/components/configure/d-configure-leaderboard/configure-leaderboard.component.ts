import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Family } from '../../../models/Family';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { FamilyService } from '../../../services/family.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configure-leaderboard',
  imports: [ToggleSwitchModule, ButtonModule, FormsModule],
  templateUrl: './configure-leaderboard.component.html',
  styleUrl: './configure-leaderboard.component.less'
})
export class ConfigureLeaderboardComponent {
  @Output('nextStep') nextStep: EventEmitter<any> = new EventEmitter();

  family: Family;
  constructor(
    private userService: UserService,
    private familyService: FamilyService
  ) {
    this.family = this.userService.family!;
  }

  async onNextStep() {
    this.family.configStep = 4;
    this.userService.family = await this.familyService.updateFamily(this.family);
    this.nextStep.emit();
  }
}
