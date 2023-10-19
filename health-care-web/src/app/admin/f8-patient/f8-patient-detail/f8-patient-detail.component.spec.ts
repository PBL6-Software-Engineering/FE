import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F8PatientDetailComponent } from './f8-patient-detail.component';

describe('F8PatientDetailComponent', () => {
  let component: F8PatientDetailComponent;
  let fixture: ComponentFixture<F8PatientDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F8PatientDetailComponent]
    });
    fixture = TestBed.createComponent(F8PatientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
