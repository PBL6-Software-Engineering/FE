import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBookingComponent } from './step-booking.component';

describe('StepBookingComponent', () => {
  let component: StepBookingComponent;
  let fixture: ComponentFixture<StepBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepBookingComponent],
    });
    fixture = TestBed.createComponent(StepBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
