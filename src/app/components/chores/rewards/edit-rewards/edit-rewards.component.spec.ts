import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRewardsComponent } from './edit-rewards.component';

describe('EditRewardsComponent', () => {
  let component: EditRewardsComponent;
  let fixture: ComponentFixture<EditRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRewardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
