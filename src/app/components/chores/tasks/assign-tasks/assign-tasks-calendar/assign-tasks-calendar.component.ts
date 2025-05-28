import { Component } from '@angular/core';

@Component({
  selector: 'app-assign-tasks-calendar',
  imports: [],
  templateUrl: './assign-tasks-calendar.component.html',
  styleUrl: './assign-tasks-calendar.component.less'
})
export class AssignTasksCalendarComponent {

    //TODO: base for CalendarEvents
    // {
    //   start: subDays(startOfDay(new Date()), 1), // startOfDay(new Date()),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: { ...colors['red'] },
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd,
  // }: CalendarEventTimesChangedEvent): void {
  //   this.events = this.events.map((iEvent) => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd,
  //       };
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  // }

}
