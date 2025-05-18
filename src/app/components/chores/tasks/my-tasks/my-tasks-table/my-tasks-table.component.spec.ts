import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTasksTableComponent } from './my-tasks-table.component';

describe('MyTasksTableComponent', () => {
  let component: MyTasksTableComponent;
  let fixture: ComponentFixture<MyTasksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTasksTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTasksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
