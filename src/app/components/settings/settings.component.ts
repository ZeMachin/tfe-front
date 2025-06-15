import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HouseholdType } from '../../models/HouseholdType';
import { FamilyService } from '../../services/family.service';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-settings',
  imports: [ToggleSwitchModule, FormsModule, ButtonModule, SelectModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.less'
})
export class SettingsComponent implements OnInit {
  householdTypes?: HouseholdType[] = [];
  name: string;
  
  constructor(
    public userService: UserService,
    private familyService: FamilyService
  ) {
    this.name = userService.family?.displayName || '';
  }

  async ngOnInit(): Promise<void> {
    this.householdTypes = await this.familyService.getHouseholdTypes();
  }

  async save() {
    if(this.userService.family) this.userService.family.displayName = this.name;
    await this.userService.updateFamily();
  }
}
