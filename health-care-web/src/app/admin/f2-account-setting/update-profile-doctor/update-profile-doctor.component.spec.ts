import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileDoctorComponent } from './update-profile-doctor.component';

describe('UpdateProfileDoctorComponent', () => {
  let component: UpdateProfileDoctorComponent;
  let fixture: ComponentFixture<UpdateProfileDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProfileDoctorComponent],
    });
    fixture = TestBed.createComponent(UpdateProfileDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
