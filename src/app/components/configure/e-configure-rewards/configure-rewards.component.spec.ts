import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureRewardsComponent } from './configure-rewards.component';

describe('ConfigureRewardsComponent', () => {
  let component: ConfigureRewardsComponent;
  let fixture: ComponentFixture<ConfigureRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureRewardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
