import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardBuyComponent } from './reward-buy.component';

describe('RewardBuyComponent', () => {
  let component: RewardBuyComponent;
  let fixture: ComponentFixture<RewardBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardBuyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
