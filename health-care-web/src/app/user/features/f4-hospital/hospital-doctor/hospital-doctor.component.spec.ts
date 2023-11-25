import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDoctorComponent } from './hospital-doctor.component';

describe('HospitalDoctorComponent', () => {
  let component: HospitalDoctorComponent;
  let fixture: ComponentFixture<HospitalDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalDoctorComponent],
    });
    fixture = TestBed.createComponent(HospitalDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
