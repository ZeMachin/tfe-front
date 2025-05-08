import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsShopComponent } from './rewards-shop.component';

describe('RewardsShopComponent', () => {
  let component: RewardsShopComponent;
  let fixture: ComponentFixture<RewardsShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardsShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
