import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FamilyMember } from '../../../../../models/FamilyMember';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { Task } from '../../../../../models/Task';
import { FamilyService } from '../../../../../services/family.service';
import { UserService } from '../../../../../services/user.service';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Family } from '../../../../../models/Family';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-assign-task-modal',
  imports: [ReactiveFormsModule, FormsModule, SelectModule, DatePickerModule, InputGroupModule, InputGroupAddonModule, FloatLabelModule, ButtonModule, InputNumberModule, InputTextModule],
  templateUrl: './assign-task-modal.component.html',
  styleUrl: './assign-task-modal.component.less'
})
export class AssignTaskModalComponent implements OnInit {
  form?: FormGroup;
  member?: FamilyMember;
  tasks: Task[] = [];
  family?: Family;
  sending: boolean = false;
  now: Date = new Date();

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private familyService: FamilyService,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  async ngOnInit(): Promise<void> {
    this.member = this.config.data.member;
    if (this.userService.family) {
      this.family = this.userService.family;
      this.tasks = await this.familyService.getFamilyTasks(this.family);
    }
    this.form = this.fb.group({
      task: [undefined, [Validators.required]],
      taskStart: [new Date(), [Validators.required]],
      taskEnd: []
    });
    if (this.family?.settings.rewards || this.family?.settings.leaderboard) this.form.addControl('points', this.fb.control(0, [Validators.required, Validators.min(0)]));
  }

  async onSubmit() {
    this.sending = true;
    if (this.userService.family && this.form && this.member) {
      try {
        const taskList = await this.familyService.assignTask(this.form.value, this.member);
        this.messageService.add({
          severity: 'success',
          summary: 'Assigned',
          detail: `The task has been assigned to ${this.member.name}!`
        });
        this.ref.close();
      } catch (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Something went wrong, the task has not been assigned. Please try again.'
        });
      } finally {
        this.sending = false;
      }
    }
  }
}