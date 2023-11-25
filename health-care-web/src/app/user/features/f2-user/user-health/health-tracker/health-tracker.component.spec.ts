import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthTrackerComponent } from './health-tracker.component';

describe('HealthTrackerComponent', () => {
  let component: HealthTrackerComponent;
  let fixture: ComponentFixture<HealthTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthTrackerComponent],
    });
    fixture = TestBed.createComponent(HealthTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
