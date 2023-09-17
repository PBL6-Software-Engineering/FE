import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInHospitalComponent } from './sign-in-hospital.component';

describe('SignInHospitalComponent', () => {
  let component: SignInHospitalComponent;
  let fixture: ComponentFixture<SignInHospitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInHospitalComponent]
    });
    fixture = TestBed.createComponent(SignInHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
