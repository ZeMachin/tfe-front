import { Component } from '@angular/core';

@Component({
  selector: 'app-assign-tasks-calendar',
  imports: [],
  templateUrl: './assign-tasks-calendar.component.html',
  styleUrl: './assign-tasks-calendar.component.less'
})
export class AssignTasksCalendarComponent {



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
