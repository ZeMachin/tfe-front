import { Component, EventEmitter, Output } from '@angular/core';
import { UserSelectionComponent } from "../../users/user-selection/user-selection.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-configure-first-member',
  imports: [ UserSelectionComponent, ButtonModule],
  templateUrl: './configure-first-member.component.html',
  styleUrl: './configure-first-member.component.less'
})
export class ConfigureFirstMemberComponent {
  @Output('nextStep') nextStep: EventEmitter<any> = new EventEmitter();

  async onNextStep() {
      this.nextStep.emit();
  }
}
