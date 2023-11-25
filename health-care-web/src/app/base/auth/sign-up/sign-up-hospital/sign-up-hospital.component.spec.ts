import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpHospitalComponent } from './sign-up-hospital.component';

describe('SignUpHospitalComponent', () => {
  let component: SignUpHospitalComponent;
  let fixture: ComponentFixture<SignUpHospitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpHospitalComponent],
    });
    fixture = TestBed.createComponent(SignUpHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
