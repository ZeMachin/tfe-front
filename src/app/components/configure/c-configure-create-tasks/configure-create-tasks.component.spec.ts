import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureCreateTasksComponent } from './configure-create-tasks.component';

describe('ConfigureCreateTasksComponent', () => {
  let component: ConfigureCreateTasksComponent;
  let fixture: ComponentFixture<ConfigureCreateTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureCreateTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureCreateTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
