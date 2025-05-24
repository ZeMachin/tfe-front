import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from '../../../../../models/TaskList';
import { CalendarEventAction, CalendarEventTimesChangedEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  addHours,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { CalendarEvent, DAYS_OF_WEEK, EventColor } from 'calendar-utils';
import { Subject } from 'rxjs';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { colors } from '../../../../../utils/colors';

@Component({
  selector: 'app-my-tasks-calendar',
  imports: [CalendarModule, CommonModule, SelectButtonModule, FormsModule, ButtonModule ],
  templateUrl: './my-tasks-calendar.component.html',
  styleUrl: './my-tasks-calendar.component.less'
})
export class MyTasksCalendarComponent implements OnInit {
  @Input('tasks') tasks: TaskList[] = [];

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
      label: '<i class="pi pi-check"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.completeTask(event);
      },
    },
  ];

  events: CalendarEvent[] = [
  ];

  constructor() {}

  ngOnInit(): void {
    this.createCalendarEvents();
  }

  createCalendarEvents() {
    for(const taskList of this.tasks) {
      this.events.push({
        start: taskList.taskStart,
        end: taskList.taskEnd,
        title: `${taskList.task.name}${taskList.points ? ` - ${taskList.points} pts` : ''}`,
        color: taskList.completedAt ? colors.completed : (taskList.taskEnd ? taskList.taskEnd.getTime() < Date.now() ? colors.late : colors.pending : colors.pending),
        actions: this.actions,
      })
    };
  }

  completeTask($event: any) {
    console.log('complete task:', $event)
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
