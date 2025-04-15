import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSummaryComponent } from './configure-summary.component';

describe('ConfigureSummaryComponent', () => {
  let component: ConfigureSummaryComponent;
  let fixture: ComponentFixture<ConfigureSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
