import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureHouseholdTypeComponent } from './configure-household-type.component';

describe('ConfigureHouseholdTypeComponent', () => {
  let component: ConfigureHouseholdTypeComponent;
  let fixture: ComponentFixture<ConfigureHouseholdTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureHouseholdTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureHouseholdTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
