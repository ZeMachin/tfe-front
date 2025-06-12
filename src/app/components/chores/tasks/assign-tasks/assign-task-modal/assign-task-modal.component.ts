import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FamilyMember } from '../../../../../models/FamilyMember';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { Task } from '../../../../../models/Task';
import { FamilyService } from '../../../../../services/family.service';
import { UserService } from '../../../../../services/user.service';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { TaskList } from '../../../../../models/TaskList';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { RecurrenceType } from '../../../../../models/Recurrence';
import { AssignedTask } from '../../../../../models/AssignedTask';

@Component({
  selector: 'app-assign-task-modal',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SelectModule,
    DatePickerModule,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabelModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    ToggleSwitchModule,
  ],
  templateUrl: './assign-task-modal.component.html',
  styleUrl: './assign-task-modal.component.less',
})
export class AssignTaskModalComponent implements OnInit {
  form?: FormGroup;
  tasks: Task[] = [];
  members: FamilyMember[] = [];
  sending: boolean = false;
  now: Date = new Date();
  new: boolean = false;
  isRecurrent: boolean = false;
  recurrenceTypes: RecurrenceType[] = [];

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private familyService: FamilyService,
    public userService: UserService,
    private messageService: MessageService
  ) {}

  async ngOnInit(): Promise<void> {
    this.tasks = await this.familyService.getFamilyTasks();
    this.members = await this.familyService.getFamilyMembers();
    this.recurrenceTypes = await this.familyService.getRecurrenceTypes();
    const taskList: TaskList = this.config.data.taskList;
    const assignedTask: AssignedTask = this.config.data.assignedTask;
    this.new = this.config.data.new;
    this.isRecurrent = !!taskList.recurrence;
    if (this.new) {
      this.form = this.fb.group({
        member: [undefined, [Validators.required]],
        task: [undefined, [Validators.required]],
        start: [taskList.start ?? new Date(), [Validators.required, beforeDateValidator('start', 'end', new Date())]],
        end: [undefined, [afterDateValidator('end', 'start')]],
      });
      if (
        this.userService.family?.settings.rewards ||
        this.userService.family?.settings.leaderboard
      )
        this.form.addControl(
          'points',
          this.fb.control(0, [Validators.required, Validators.min(0)])
        );
    } else {
      this.form = this.fb.group({
        id: [taskList.id],
        member: [taskList.member, [Validators.required]],
        task: [taskList.task, [Validators.required]],
        start: [assignedTask.start ?? new Date(), [Validators.required, beforeDateValidator('start', 'end', new Date())]], 
        end: [assignedTask.end, [afterDateValidator('end', 'start')]], // TODO: if recurrence, add required
        recurrence: [taskList.recurrence],
        recurrenceEnd: [taskList.recurrenceEnd, [afterDateValidator('recurrenceEnd', 'start')]], // TODO: if recurrence, add required
      });
      if (
        this.userService.family?.settings.rewards ||
        this.userService.family?.settings.leaderboard
      )
        this.form.addControl(
          'points',
          this.fb.control(taskList.points ?? 0, [
            Validators.required,
            Validators.min(0),
          ])
        );
    }
  }

  toggleRecurrence() {
    if (this.isRecurrent) {
      const taskList: TaskList = this.config.data.taskList;
      if (this.new) {
        this.form?.addControl(
          'recurrence',
          this.fb.control(undefined, Validators.required)
        );
        this.form?.addControl(
          'recurrenceEnd',
          this.fb.control(undefined, [Validators.required])
        );
      } else {
        this.form?.addControl(
          'recurrence',
          this.fb.control(taskList.recurrence, [Validators.required])
        );
        this.form?.addControl(
          'recurrenceEnd',
          this.fb.control(taskList.recurrenceEnd, [Validators.required])
        );
      }
      // Note: for some crazy reason the Validators.required does not seem to work when added to the form on line 70. Therefore I had it AGAIN afterwards and it then works. No idea why and no time to debug it, I'll leave it to later me to figure it out. If you read this and do not believe me, feel free to uncomment the console.log()'s underneath or use the debugger for some fun with the amazing Angular ReactiveForms. This is insane.

      const recurrenceControl: FormControl = this.form?.get(
        'recurrence'
      ) as FormControl;
      const recurrenceEndControl: FormControl = this.form?.get(
        'recurrenceEnd'
      ) as FormControl;

      // recurrenceControl.updateValueAndValidity();
      // console.log('recurrence has validator required before:', recurrenceControl.hasValidator(Validators.required));
      // console.log('recurrence is valid before:', recurrenceControl.valid)

      recurrenceControl.addValidators(Validators.required);
      recurrenceControl.updateValueAndValidity();
      recurrenceEndControl.addValidators([Validators.required, afterDateValidator('recurrenceEnd', 'start')]);
      recurrenceEndControl.updateValueAndValidity();

      // console.log('recurrence has validator required after:', recurrenceControl.hasValidator(Validators.required));
      // console.log('recurrence is valid after:', recurrenceControl.valid)
      // console.log('new form:', this.form)
      const endDateControl: FormControl = this.form?.get('end') as FormControl;
      endDateControl.addValidators(Validators.required);
      endDateControl.updateValueAndValidity();
    } else {
      this.form?.removeControl('recurrence');
      this.form?.removeControl('recurrenceEnd');
      const endDateControl: FormControl = this.form?.get('end') as FormControl;
      endDateControl.removeValidators(Validators.required);
      endDateControl.updateValueAndValidity();
    }
  }

  async onSubmit() {
    this.sending = true;
    if (this.form) {
      try {
        this.new
          ? await this.familyService.assignTask(
              this.form.value,
              this.form.value.member
            )
          : await this.familyService.editAssignedTask(
              this.form.value,
              this.form.value.member
            );
        this.messageService.add({
          severity: 'success',
          summary: 'Assigned',
          detail: `The task has been assigned to ${this.form.value.member.name}!`,
        });
        this.ref.close();
      } catch (err: any) {
        const detail = err.error?.message
          ? `The following error occured: ${err.error?.message}`
          : 'Something went wrong, the task has not been assigned. Please try again.';
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail,
        });
      } finally {
        this.sending = false;
      }
    }
  }
}

const beforeDateValidator = (name: string, controlName?: string, date?: Date): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    let valitionErrors: ValidationErrors = {};
    if(date && control.value && (control.value as Date).getTime() > date.getTime())
      valitionErrors['dateError'] = `${name} must be before ${date}`;
    if(controlName && control.parent?.get(controlName) && control.parent.get(controlName)!.value && (control.value as Date).getTime() > control.parent.get(controlName)!.value.getTime())
      valitionErrors['controlError'] = `${name} must be before ${control.parent.get(controlName)!.value}`;
    if(Object.keys(valitionErrors).length) return valitionErrors;
    else return null;
  }
}

const afterDateValidator = (name: string, controlName?: string, date?: Date): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    let valitionErrors: ValidationErrors = {};
    if(date && control.value && (control.value as Date).getTime() < date.getTime())
      valitionErrors['dateError'] = `${name} must be after ${date}`;
    if(controlName && control.parent?.get(controlName) && control.parent.get(controlName)!.value && (control.value as Date).getTime() < control.parent.get(controlName)!.value.getTime())
      valitionErrors['controlError'] = `${name} must be after ${control.parent.get(controlName)!.value}`;
    if(Object.keys(valitionErrors).length) return valitionErrors;
    else return null;
  }
}