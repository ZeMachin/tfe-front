import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configure-leaderboard',
  imports: [ToggleSwitchModule, ButtonModule, FormsModule],
  templateUrl: './configure-leaderboard.component.html',
  styleUrl: './configure-leaderboard.component.less'
})
export class ConfigureLeaderboardComponent {
  @Output('nextStep') nextStep: EventEmitter<any> = new EventEmitter();

  constructor(
    public userService: UserService
  ) { }

  async onNextStep() {
      this.nextStep.emit();
  }
}
