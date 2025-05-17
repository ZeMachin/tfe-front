import { Component, EventEmitter, Output } from '@angular/core';
import { FamilyService } from '../../../services/family.service';
import { UserService } from '../../../services/user.service';
import { UserProfileComponent } from "../../users/user-profile/user-profile.component";

@Component({
  selector: 'app-configure-first-member',
  imports: [UserProfileComponent],
  templateUrl: './configure-first-member.component.html',
  styleUrl: './configure-first-member.component.less'
})
export class ConfigureFirstMemberComponent {
  @Output('nextStep') nextStep: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    private familyService: FamilyService
  ) {}


  async submit() {
    // const member = await this.familyService.createMemberAndMoveToNextStep(this.form.value); // TODO: handle error
    // TODO: step = 1
    // TODO: update family
    // TODO: refresh family
    // TODO: go to next step
  }
}
