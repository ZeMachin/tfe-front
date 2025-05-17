import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FamilyMember } from '../../../models/FamilyMember';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputOtpModule } from 'primeng/inputotp';
import { FamilyService } from '../../../services/family.service';
import { UserService } from '../../../services/user.service';
import { FamilyMemberStatus } from '../../../models/FamilyMemberStatus';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, ButtonModule, ColorPickerModule, InputOtpModule, SelectModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.less'
})
export class UserProfileComponent implements OnInit {
  @Output('onSubmit') onSubmit: EventEmitter<any> = new EventEmitter();
  member?: FamilyMember;
  form?: FormGroup;
  statuses: FamilyMemberStatus[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private familyService: FamilyService,
    private messageService: MessageService
  ) { }

  async ngOnInit(): Promise<void> {
    const state = history.state;
    if (state.member) {
      this.member = state.member;
    }
    this.statuses = await this.familyService.getStatuses();
    this.createForm(this.member)
  }

  createForm(member?: FamilyMember) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      color: ['#ffffff', Validators.required],
      pin: [''],
      status: [this.statuses.find((s) => s.name = 'Adult')],
    })
  }

  async submit(): Promise<void> {
    if (this.form?.valid) {
      try {
        const member = await this.familyService.createMemberAndMoveToNextStep(this.form.value); // TODO: handle error
        this.userService.member = member;
        await this.userService.refreshFamily();
        await this.userService.refreshMember();
        this.onSubmit.emit();
      } catch (err) {

      }
    } else {
      console.error('Form invalid');
    }
  }
}
