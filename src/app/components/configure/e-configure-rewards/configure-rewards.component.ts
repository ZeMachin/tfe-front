import { Component, EventEmitter, Output } from '@angular/core';
import _ from 'lodash';
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

  async onNextStep() {
      this.nextStep.emit();
  }
}