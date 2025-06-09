import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FamilyService } from '../../../services/family.service';
import { UserService } from '../../../services/user.service';
import { HouseholdType } from '../../../models/HouseholdType';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-configure-household-type',
  imports: [ReactiveFormsModule, SelectModule, ButtonModule],
  templateUrl: './configure-household-type.component.html',
  styleUrl: './configure-household-type.component.less'
})
export class ConfigureHouseholdTypeComponent implements OnInit {
  @Output('nextStep') nextStep: EventEmitter<any> = new EventEmitter();
  @Output('previousStep') previousStep: EventEmitter<any> = new EventEmitter();
  form?: FormGroup;
  householdTypes?: HouseholdType[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private familyService: FamilyService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.householdTypes = await this.familyService.getHouseholdTypes();
    this.form = this.fb.group({
      householdType: [undefined, Validators.required],
    })
  }

  async onSubmit(): Promise<void> {
    if (this.form?.valid) {
      if(this.userService.family) {
        this.userService.family.householdType = this.form.value.householdType;
        await this.familyService.pickHousehold(); // TODO: handle error
        await this.userService.refreshFamily();
        this.nextStep.emit();
      } else {
        // TODO: handle error
      }
    } else {
      console.error('Form invalid');
    }
  }

  onPreviousStep() {
    this.previousStep.emit();
  }
}
