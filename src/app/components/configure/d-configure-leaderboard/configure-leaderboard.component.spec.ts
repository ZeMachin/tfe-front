import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureLeaderboardComponent } from './configure-leaderboard.component';

describe('ConfigureLeaderboardComponent', () => {
  let component: ConfigureLeaderboardComponent;
  let fixture: ComponentFixture<ConfigureLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureLeaderboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
