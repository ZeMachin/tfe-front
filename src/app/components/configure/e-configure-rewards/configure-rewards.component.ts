import { Component, EventEmitter, Output } from '@angular/core';
import _ from 'lodash';
import { FamilyService } from '../../../services/family.service';
import { UserService } from '../../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { EditRewardsComponent } from "../../chores/rewards/edit-rewards/edit-rewards.component";

@Component({
  selector: 'app-configure-rewards',
  imports: [ButtonModule, EditRewardsComponent],
  templateUrl: './configure-rewards.component.html',
  styleUrl: './configure-rewards.component.less'
})
export class ConfigureRewardsComponent {
  @Output('nextStep') nextStep: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    private familyService: FamilyService
  ) { }

  async onNextStep() {
    const family = this.userService.family;
    if (family) {
      family.configStep = 5;
      await this.familyService.updateFamily(family);
      this.nextStep.emit();
    }
  }
}