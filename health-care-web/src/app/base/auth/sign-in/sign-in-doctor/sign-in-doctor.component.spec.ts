import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInDoctorComponent } from './sign-in-doctor.component';

describe('SignInDoctorComponent', () => {
  let component: SignInDoctorComponent;
  let fixture: ComponentFixture<SignInDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInDoctorComponent]
    });
    fixture = TestBed.createComponent(SignInDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
