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
import { ConfirmationService, MessageService } from 'primeng/api';
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
    private location: Location,
    private confirmService: ConfirmationService
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
  get isNewMember() { return !history.state.member }

  confirmDeletion() {
    if (history.state.member) {
      if ((history.state.member as FamilyMember).status.name === 'Adult' && this.userService.family?.members?.filter((m) => m.status.name === 'Adult').length && this.userService.family?.members?.filter((m) => m.status.name === 'Adult').length > 1)
        this.openConfirmDeletion();
      else
        this.messageService.add({
          severity: 'error',
          summary: 'Adult needed',
          detail: 'You need to keep at least one adult in your family!'
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Hey!',
        detail: "You're not supposed to be able to do that!"
      });
    }
  }

  openConfirmDeletion() {
    this.confirmService.confirm({
      message: 'Are you sure that you want to delete this profile?',
      header: 'Deletion confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'No',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Yes',
        severity: 'danger',
        outtlined: true
      },
      accept: async () => {
        this.deleteMember();
      },
    });
  }

  async deleteMember() {
    if (history.state.member) {
      this.sending = true;
      try {
        await this.familyService.deleteFamilyMember(history.state.member);
        await this.userService.refreshFamily();
        const delay = 3000;
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'The profile has been deleted successfully!',
          life: delay
        });
        this.location.back();
      } catch (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'Oops',
          detail: "Something went wrong.\nPlease refresh the page."
        });
      } finally {
        this.sending = false;
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Oops',
        detail: "Something went wrong.\nPlease refresh the page."
      });
    }
  }
}
