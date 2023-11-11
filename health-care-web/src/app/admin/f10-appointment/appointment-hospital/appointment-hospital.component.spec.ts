import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentHospitalComponent } from './appointment-hospital.component';

describe('AppointmentHospitalComponent', () => {
  let component: AppointmentHospitalComponent;
  let fixture: ComponentFixture<AppointmentHospitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentHospitalComponent]
    });
    fixture = TestBed.createComponent(AppointmentHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
