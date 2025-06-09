import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-settings',
  imports: [ToggleSwitchModule, FormsModule, ButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.less'
})
export class SettingsComponent {
  constructor(public userService: UserService) {}
}
