import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectionVignetteComponent } from './user-selection-vignette.component';

describe('UserSelectionVignetteComponent', () => {
  let component: UserSelectionVignetteComponent;
  let fixture: ComponentFixture<UserSelectionVignetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSelectionVignetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSelectionVignetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
