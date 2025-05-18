import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTasksCalendarComponent } from './my-tasks-calendar.component';

describe('MyTasksCalendarComponent', () => {
  let component: MyTasksCalendarComponent;
  let fixture: ComponentFixture<MyTasksCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTasksCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTasksCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
