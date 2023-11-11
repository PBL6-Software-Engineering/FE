import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDoctorComponent } from './appointment-doctor.component';

describe('AppointmentDoctorComponent', () => {
  let component: AppointmentDoctorComponent;
  let fixture: ComponentFixture<AppointmentDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentDoctorComponent]
    });
    fixture = TestBed.createComponent(AppointmentDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
