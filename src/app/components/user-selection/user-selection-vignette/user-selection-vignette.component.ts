import { Component, Input } from '@angular/core';
import { FamilyMember } from '../../../models/FamilyMember';

@Component({
  selector: 'app-user-selection-vignette',
  imports: [],
  templateUrl: './user-selection-vignette.component.html',
  styleUrl: './user-selection-vignette.component.less'
})
export class UserSelectionVignetteComponent {
  @Input('member') member?: FamilyMember;
  @Input('edit') edit: boolean = false;
}
