import { Component, Input, OnInit, Output } from '@angular/core';
import { TaskList } from '../../../../../models/TaskList';
import { CalendarEventAction, CalendarEventTimesChangedEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { CalendarEvent, DAYS_OF_WEEK, EventColor } from 'calendar-utils';
import { Subject } from 'rxjs';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { colors } from '../../../../../utils/colors';
import { ThenableEventEmitter } from '../../../../../utils/thenable-event';
import { CompletionStatus } from '../../../../../models/CompletionStatuts';
import { AssignedTask } from '../../../../../models/AssignedTask';

@Component({
  selector: 'app-my-tasks-calendar',
  imports: [CalendarModule, CommonModule, SelectButtonModule, FormsModule, ButtonModule],
  templateUrl: './my-tasks-calendar.component.html',
  styleUrl: './my-tasks-calendar.component.less'
})
export class MyTasksCalendarComponent implements OnInit {
  @Input('tasks') taskLists: TaskList[] = [];
  @Output('onCompleteTask') onCompleteTask: ThenableEventEmitter<AssignedTask> = new ThenableEventEmitter();

  sendings: { [key: number]: boolean } = {};

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  calendarView = Object.values(CalendarView);

  viewDate: Date = new Date();

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = true;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [];

  viewOption?: string;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="pi pi-check""></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.completeTask(event);
      },
    },
  ];

  events: CalendarEvent<{taskList: TaskList, assignedTask: AssignedTask}>[] = [];

  constructor() { }

  ngOnInit(): void {
    this.createCalendarEvents();
  }

  createCalendarEvents() {
    this.events = [];

    for (const taskList of this.taskLists) {
      for (const assignedTask of taskList.assignedTasks)
        this.events.push({
          start: assignedTask.start,
          end: assignedTask.end,
          title: `${taskList.task.name}${assignedTask.points ? ` - ${assignedTask.points} pts` : ''}`,
          color: colors[assignedTask.status],
          actions: assignedTask.status != CompletionStatus.completed ? this.actions : [],
          meta: {
            taskList,
            assignedTask
          },
        })
    };
  }

  async completeTask(event: CalendarEvent<{taskList: TaskList, assignedTask: AssignedTask}>) {
    const assignedTask: AssignedTask = event.meta?.assignedTask as AssignedTask;
    if (assignedTask.id) {
      this.sendings[assignedTask.id] = true;
      await this.onCompleteTask.emit(assignedTask)
        .then(() => {
          this.sendings[assignedTask.id!] = false;
        })
        .catch((err) => this.sendings[assignedTask.id!] = false)
        .finally(async () => {
          setTimeout(() => this.createCalendarEvents(), 1); // Very stupid, but it doesn't want to refresh the list otherwise, and I don't feel like refactoring the taskLists to Subject yet
        });
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // TODO: open descriptive modal
  }
}
