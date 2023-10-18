import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F8PatientCreateComponent } from './f8-patient-create.component';

describe('F8PatientCreateComponent', () => {
  let component: F8PatientCreateComponent;
  let fixture: ComponentFixture<F8PatientCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F8PatientCreateComponent]
    });
    fixture = TestBed.createComponent(F8PatientCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
