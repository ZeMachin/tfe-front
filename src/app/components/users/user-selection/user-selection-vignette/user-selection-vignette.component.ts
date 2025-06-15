import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FamilyMember } from '../../../../models/FamilyMember';
import { InputOtpChangeEvent, InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-selection-vignette',
  imports: [InputOtpModule, FormsModule],
  templateUrl: './user-selection-vignette.component.html',
  styleUrl: './user-selection-vignette.component.less'
})
export class UserSelectionVignetteComponent {
  @Input('member') member!: FamilyMember;
  @Input('edit') edit: boolean = false;
  @Output('userSelect') userSelect: EventEmitter<FamilyMember> = new EventEmitter();

  showPin: boolean = false;
  showErrorMessage: boolean = false;
  pin?: string;

  onUserSelect(member: FamilyMember) {
    if (member.pin) {
      this.askForPin();
    } else {
      this.userSelect.emit(member);
    }
  }

  askForPin() {
    this.showPin = true;
  }

  checkPin(event: InputOtpChangeEvent) {
    const value = event.value;
    if (value.length === 4) {
      if (value === this.member.pin) {
        this.userSelect.emit(this.member);
      } else { 
        // TODO: ideally would autofocus the first element of OtpInput as well
        this.pin = '';
        this.showErrorMessage = true; 
      }
    }
  }
}
