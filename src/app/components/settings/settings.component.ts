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
  
  constructor(
    public userService: UserService,
    private familyService: FamilyService
  ) {}

  async ngOnInit(): Promise<void> {
    this.householdTypes = await this.familyService.getHouseholdTypes();
  }

  async save() {
    await this.userService.updateFamily();
  }
}
