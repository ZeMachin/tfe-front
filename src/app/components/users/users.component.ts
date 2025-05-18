import { Component } from '@angular/core';
import { UserSelectionComponent } from "./user-selection/user-selection.component";

@Component({
  selector: 'app-users',
  imports: [UserSelectionComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.less'
})
export class UsersComponent {

}
