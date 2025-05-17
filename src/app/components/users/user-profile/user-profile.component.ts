import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FamilyMember } from '../../../models/FamilyMember';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputOtpModule } from 'primeng/inputotp';
import { FamilyService } from '../../../services/family.service';
import { UserService } from '../../../services/user.service';
import { FamilyMemberStatus } from '../../../models/FamilyMemberStatus';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, ButtonModule, ColorPickerModule, InputOtpModule, SelectModule, FloatLabelModule, InputTextModule, ToggleSwitchModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.less'
})
export class UserProfileComponent implements OnInit {
  form?: FormGroup;
  statuses: FamilyMemberStatus[] = [];
  hasPin: boolean = false;
  sending: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private familyService: FamilyService,
    private messageService: MessageService,
    private location: Location
  ) {
    this.form = new FormGroup({
      name: new FormControl(),
      color: new FormControl(),
    });
  }

  async ngOnInit(): Promise<void> {
    this.statuses = await this.familyService.getStatuses();
    if (history.state.member) this.createForm(await this.familyService.getFamilyMember(history.state.member));
    else this.createForm();
  }

  createForm(member?: FamilyMember) {
    if (member) {
      this.form = this.fb.group({
        id: [member.id],
        name: [member.name, Validators.required],
        color: [member.color, Validators.required],
        status: [this.statuses.find((s) => s.name = member.status.name)],
      })
      this.form.get('color')?.setValue(member.color);
      if (member.pin) {
        this.hasPin = true;
        this.form?.addControl('pin', this.fb.control(member.pin, [Validators.required]));
      }
    } else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        color: ['#ffffff', Validators.required],
        status: [this.statuses.find((s) => s.name = 'Adult')],
      })
    }
  }

  async submit(): Promise<void> {
    if (this.form?.valid) {
      this.sending = true;
      try {
        history.state.member ? await this.familyService.updateFamilyMember(this.form.value) : await this.familyService.createMember(this.form.value);
        await this.userService.refreshFamily();
        await this.userService.refreshMember();
        this.messageService.add({
          severity: 'success',
          summary: history.state.member ? 'Updated' : 'Created',
          detail: history.state.member ? 'The family member has been updated successfully!' : 'The new family member has been created successfully!'
        });
        this.location.back();
      } catch (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: `Something went wrong, the family member has not been ${history.state.member ? 'updated' : 'created'}. Please try again.`
        });
      } finally {
        this.sending = false;
      }
    } else {
      console.error('Form invalid');
    }
  }

  togglePin() {
    if (this.hasPin) {
      if (history.state.member) {
        this.form?.addControl('pin', this.fb.control(history.state.member.pin, [Validators.required]));
      } else {
        this.form?.addControl('pin', this.fb.control('', [Validators.required]));
      }
    } else {
      this.form?.removeControl('pin');
    }
  }

  get submitButtonLabel() { return history.state.member ? 'Update details' : 'Create family member'; }
}
