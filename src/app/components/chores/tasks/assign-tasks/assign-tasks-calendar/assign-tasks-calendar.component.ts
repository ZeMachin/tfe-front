import { Component, OnInit } from '@angular/core';
import { CalendarView, DAYS_OF_WEEK, CalendarEventAction, CalendarEvent, CalendarModule, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { isSameMonth, isSameDay, addDays, addMonths } from 'date-fns';
import { Subject } from 'rxjs';
import { CompletionStatus, TaskList } from '../../../../../models/TaskList';
import { colors } from '../../../../../utils/colors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FamilyService } from '../../../../../services/family.service';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AssignTaskModalComponent } from '../assign-task-modal/assign-task-modal.component';

@Component({
  selector: 'app-assign-tasks-calendar',
  imports: [CalendarModule, CommonModule, SelectButtonModule, FormsModule, ButtonModule, ContextMenuModule],
  templateUrl: './assign-tasks-calendar.component.html',
  styleUrl: './assign-tasks-calendar.component.less'
})
export class AssignTasksCalendarComponent implements OnInit {

  date: Date = new Date();

  ref: DynamicDialogRef | undefined;

  tasks: TaskList[] = [];

  sendings: { [key: number]: boolean } = {};

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  ViewDateChange = ViewDateChange;

  calendarView = Object.values(CalendarView);

  viewDate: Date = new Date();

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = true;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [];

  viewOption?: string;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="pi pi-pencil""></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.editTask(event);
      },
    },
  ];

  events: CalendarEvent<TaskList>[] = [];

  items: MenuItem[] = [
    {
      label: 'Add event',
      icon: 'pi pi-plus',
      command: (event: MenuItemCommandEvent) => this.addEvent(event)
    },
  ]

  constructor(
    private familyService: FamilyService,
    private dialogService: DialogService
  ) { }

  async ngOnInit(): Promise<void> {
    this.refreshData();
  }

  async refreshData() {
    this.tasks = await this.familyService.getFamilyTaskList();
    this.createCalendarEvents();
  }

  createCalendarEvents() {
    this.events = [];
    const nonRecurrentTasks = this.tasks.filter((t) => !t.recurrence);
    for (const taskList of nonRecurrentTasks) {
      this.events.push({
        start: taskList.taskStart,
        end: taskList.taskEnd,
        title: `${taskList.task.name}${taskList.points ? ` - ${taskList.points} pts` : ''}`,
        color: colors[taskList.status],
        actions: this.actions,
        meta: taskList,
        resizable: {
          beforeStart: taskList.status != CompletionStatus.completed,
          afterEnd: taskList.status != CompletionStatus.completed,
        },
        draggable: taskList.status != CompletionStatus.completed,
      })
    };
    
    const recurrentTasks = this.tasks.filter((t) => t.recurrence); 

    
    for (const taskList of recurrentTasks) {
      const startDate: Date = new Date(); // TODO: find start date based on viewDate and calendarView. Check CTC Booking, it might be there already, most likely in the ws
      let endDate: Date = new Date();
      switch(this.view) {
        case CalendarView.Month:
          endDate = addMonths(startDate, 1);
        case CalendarView.Week:
        case CalendarView.Day:
      }
      const endDate: Date = new Date();                                    
      this.events.push({
        start: taskList.taskStart,
        end: taskList.taskEnd,
        title: `${taskList.task.name}${taskList.points ? ` - ${taskList.points} pts` : ''}`,
        color: colors[taskList.status],
        actions: this.actions,
        meta: taskList,
        resizable: {
          beforeStart: taskList.status != CompletionStatus.completed,
          afterEnd: taskList.status != CompletionStatus.completed,
        },
        draggable: taskList.status != CompletionStatus.completed,
      })
    };
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

  editTask(event: CalendarEvent) {
    this.ref = this.dialogService.open(
      AssignTaskModalComponent,
      {
        header: `Assign task`,
        modal: true,
        closable: true,
        data: {
          taskList: event.meta,
          new: false
        }
      })

    this.ref.onClose.subscribe((x) => {
      this.refreshData();
    })
  }

  onChangeViewDate(type: ViewDateChange) {
    // console.log('view change type:', type)
    // console.log('calendar view:', this.calendarView)
    // console.log('view date:', this.viewDate)
    this.createCalendarEvents();
    // switch(type) {
    //   case ViewDateChange.previous:
    //   case ViewDateChange.today:
    //   case ViewDateChange.next:
    //   case ViewDateChange.day:
    //   case ViewDateChange.week:
    //   case ViewDateChange.month:
    // }
  }

  onContextMenu(date: Date) {
    this.date = date;
  }

  addEvent(event: MenuItemCommandEvent) {
    this.openTaskAssignmentModal(this.date);
  }

  openTaskAssignmentModal(date: Date) {
    this.ref = this.dialogService.open(
      AssignTaskModalComponent,
      {
        header: `Assign task`,
        modal: true,
        closable: true,
        data: {
          taskList: {
            taskStart: date
          },
          new: true
        }
      });

    this.ref.onClose.subscribe((x) => {
      this.refreshData();
    })
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // TODO: open descriptive modal
  }
}

enum ViewDateChange {
  previous = 'previous',
  today = 'today',
  next = 'next',
  day = 'day',
  week = 'week',
  month = 'month'
}