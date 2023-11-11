import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHospitalComponent } from './booking-hospital.component';

describe('BookingHospitalComponent', () => {
  let component: BookingHospitalComponent;
  let fixture: ComponentFixture<BookingHospitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingHospitalComponent]
    });
    fixture = TestBed.createComponent(BookingHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
