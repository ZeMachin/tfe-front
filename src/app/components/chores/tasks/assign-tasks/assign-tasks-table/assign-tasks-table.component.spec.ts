import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTasksTableComponent } from './assign-tasks-table.component';

describe('AssignTasksTableComponent', () => {
  let component: AssignTasksTableComponent;
  let fixture: ComponentFixture<AssignTasksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTasksTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTasksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
