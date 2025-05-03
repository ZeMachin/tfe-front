import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputOtpModule } from 'primeng/inputotp';
import { FamilyMemberStatus } from '../../../models/FamilyMemberStatus';
import { FamilyService } from '../../../services/family.service';

@Component({
  selector: 'app-configure-first-member',
  imports: [ReactiveFormsModule, ButtonModule, ColorPickerModule, InputOtpModule],
  templateUrl: './configure-first-member.component.html',
  styleUrl: './configure-first-member.component.less'
})
export class ConfigureFirstMemberComponent implements OnInit {
  @Output('nextStep') nextStep: EventEmitter<any> = new EventEmitter();
  form?: FormGroup;
  statuses?: FamilyMemberStatus[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private familyService: FamilyService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.statuses = await this.familyService.getStatuses();
    this.form = this.fb.group({
      name: ['', Validators.required],
      color: ['#ffffff', Validators.required],
      pin: [''],
      status: [this.statuses.find((s) => s.name = 'Adult')],
    })
  }

  async onSubmit(): Promise<void> {
    if (this.form?.valid) {
      if(this.userService.family) {
        const member = await this.familyService.createMemberAndMoveToNextStep(this.userService.family, this.form.value); // TODO: handle error
        console.log('member:', member)
        this.userService.member = member;
        await this.userService.refreshFamily();
        await this.userService.refreshMember();
        this.nextStep.emit();
      } else {
        // TODO: handle error
      }
    } else {
      console.error('Form invalid');
    }
  }
}
