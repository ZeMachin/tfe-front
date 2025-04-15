import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureFirstMemberComponent } from './configure-first-member.component';

describe('ConfigureFirstMemberComponent', () => {
  let component: ConfigureFirstMemberComponent;
  let fixture: ComponentFixture<ConfigureFirstMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureFirstMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureFirstMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
